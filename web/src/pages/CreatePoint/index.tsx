import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map,TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import api from '../../services/api';
import axios from 'axios';

import './styles.css';

import logo from '../../assets/logo.svg';

// array or object: inform type to variable manually
interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IbgeUfResponse{
    sigla: string;
}

interface IbgeCityResponse{
    nome: string;
}

const CreatePoint = () => {
    const  [items,setItems] = useState<Item[]>([]);
    const  [ufs,setUfs] = useState<string[]>([]);
    const  [cities,setCities] = useState<string[]>([]);

    const  [selectedUf,setSelectedUf] = useState('0');
    const  [selectedCity,setSelectedCity] = useState('0');
    const  [selectedItems,setSelectedItems] = useState<number[]>([]);
    const  [selectedPosition,setSelectedPosition] = useState<[number,number]>([0,0]);

    
    
    const [ formData, setFormData] = useState({
        name:'',
        email: '',
        whatsapp: '',
    });
    const  [initialPosition,setInitialPosition] = useState<[number,number]>([0,0]);
    
    const history = useHistory();


    //useEffect execute one time
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position =>{
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude])
        });
    },[])

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data)
        })
    },[]);

    useEffect(() => {
        axios.get<IbgeUfResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials  = response.data.map(uf => uf.sigla)

            setUfs(ufInitials);
        })
    },[]);

    useEffect(() => {
        //load Cities on change
        if(selectedUf !== '0'){
            axios.get<IbgeCityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response => {
                const cityNames  = response.data.map(city => city.nome)

                setCities(cityNames);
            })
        }
        
    },[selectedUf]);


    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
       setSelectedUf(event.target.value);
    } 

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
       setSelectedCity(event.target.value);
    } 

    function handleMapClick(event: LeafletMouseEvent){
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);
        
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name,value} = event.target;
        setFormData({...formData, [name] : value})
    }

    function handleSelectItem(id: number){
        const alreadySelected = selectedItems.findIndex(item=> item === id);

        if(alreadySelected >= 0){
            const filteredItems = selectedItems.filter(item => item !== id);

            setSelectedItems(filteredItems);
        }else{
            setSelectedItems([...selectedItems, id]);
        }
        
    }

    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        const {name,email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;

        const data = {
            name, email, whatsapp, uf, city, latitude, longitude, items
        }

        await api.post('points',data);

        history.push('/');
        
    }


    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>

                <Link to="/">
                    <FiArrowLeft/>
                    Voltar para home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br/> ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input type="text" name="name" id="name" onChange={handleInputChange}/>
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" name="email" id="email" onChange={handleInputChange} />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        <Marker position={selectedPosition}/>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select 
                            name="uf" 
                            value={selectedUf} 
                            onChange={handleSelectUf} id="uf">
                                <option value="0">Selecione um Estado</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select 
                            name="city" 
                            value={selectedCity} 
                            onChange={handleSelectCity}
                            id="city">
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>    
                    
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => (
                            <li key={item.id} className={selectedItems.includes(item.id) ? 'selected' : ''}  onClick={() => handleSelectItem(item.id)}>
                                <img src={item.image_url} alt={item.title}/>
                                <span>{item.title}</span>
                            </li>
                        ))}
                       
                    </ul>

                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>


            </form>
        </div>
    );
}

export default CreatePoint;