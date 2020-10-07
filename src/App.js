import React,{useState, useEffect} from 'react';

import './app.css'
//import backimg from './assets/raio.jpg'

import api from './services/api.js'

import Header from './components/Header'

function App(){

    const [projects, setProjects] = useState([])
    //useState retornar array
    //1.Variavel com posiçao inicial
    //2.função para atualizar esse valor

    useEffect(() => { 
       api.get('/projects').then(Response =>{
           setProjects(Response.data);
       })
    },[]);

    async function handleAddProject(){
        //projects.push(`Novo Projeto ${Date.now()}`)
        //setProjects([...projects,`Novo Projeto ${Date.now()}`])

        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
	        owner: "ezau Martins"
        });

        const project = response.data;
        setProjects([...projects, project]);
    }

    return (
    <>

    <Header title="Projects"/>
        <ul>
    {projects.map( project => <li key={project.id}>{project.title}</li>)}
        </ul>
     
    <button type="button" onClick={handleAddProject} >Adicionar Projeto</button>
    </>
    )
}

export default App;