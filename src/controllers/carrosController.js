import dados from "./../models/dados.js"
const { carros } = dados;

const getAllCarros = (req, res) => {
    let resultado = carros;

    res.status(200).json({
        total:resultado.length,
        data: resultado
    });
};

const getCarrosById = (req, res) => {

    const id = parseInt(req.params.id);
    const carro = carros.find(c => c.id === id);

    if (!carro) {
        return res.status(404).json({
            success: false,
            message: `Carro com o id ${id} não existe!`
        });
    }

    res.status(200).json({
        total: carro.length,
        data: carro
    });
};

const createCarros = (req, res) => {
    const { nome, modelo, ano, cor, qtdeVitorias } = req.body;

    if ( !nome || !modelo || !ano || !cor) {
        return res.status(400).json({
            sucess: false,
            message: "Nome, modelo, ano e cor são obrigatórios!"
        });
    }

    const novoCarro = {
        id: carros.length + 1,
        nome: nome,
        modelo: modelo,
        ano: ano,
        cor: cor
    }

    carros.push(novoCarro);

    res.status(201).json({
        success: true,
        message: "Novo carro adicionado com sucesso!",
        data: novoCarro
    });
};

const deleteCarro = (req, res) => {
    const id = parseInt(req.params.id);

    if(isNaN(id)) {
        return res.status(404).json({
            sucess: false,
            message: "O id deve ser válido"
        });
    }

    const carroParaRemover = carros.find(c => c.id === id);

    if (!carroParaRemover) {
        return res.status(404).json({
            sucess: false,
            message: `Carro com o id ${id} não existe!`
        })
    }

    const carrosFiltrados = carros.filter(carros => carros.id !== id);

    carros.splice(0, carros.length, ...carrosFiltrados);

    res.status(200).json({
        sucess: true,
        message: `O carro com o id ${id} foi removido`
    })
}

const updateCarro = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, modelo, ano, cor, qtdeVitorias } = req.body;

    const idParaEditar = id;

    if (isNaN(idParaEditar)) {
        return res.status(400).json({
            sucess: false,
            message: "O id deve ser um número válido"
        })
    }

    const carroExiste = carros.find(carro => carro.id === idParaEditar);
    if (!carroExiste) {
        return res.status(404).json({
            sucess: false,
            message: `Carro com o id ${idParaEditar} não aceitar`
        })
    }

    const carrosAtualizados = carros.map (carro => carro.id === idParaEditar ? {
        ...carro,
        ...(nome && {nome}),
        ...(modelo && {modelo}),
        ...(ano && {ano : parseInt(ano)}),
        ...(cor && {cor}),
        ...(qtdeVitorias && {qtdeVitorias : parseInt(qtdeVitorias)})
    } : carro
);

carros.splice(0, carros.length, ...carrosAtualizados);

const carroEditado = carros.find(carro => carro.id === idParaEditar);

res.status(200).json({
    success: true,
    message: "Dados dos carros atualizados com sucesso!",
    carro: carroEditado
});
}


export { getAllCarros, getCarrosById, createCarros, deleteCarro, updateCarro };