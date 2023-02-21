
function App() {
    function carregarDados() {
        const dados = document.getElementById("conteudo");
        console.log(dados.value)
    }
    return (
        <div >
            <h1>Carregar App</h1>
            <button onClick={carregarDados}>carregar app</button>
        </div>
    );
}

export default App;
