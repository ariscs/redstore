import React, { useState, useEffect } from 'react';
import './styles.scss';

import { firestore } from './../../../firebase/utils';

const Ventaspage = props => {
    const [lista, setLista] = useState([]);
    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let clientesRef = await firestore.collection('users');
            let allClientes = clientesRef.get()
            .then(snapshot => {
                snapshot.forEach(async doc => {
                    let user = {
                        id: doc.id,
                        data: doc.data(),
                        pedidos: []
                    }
                    
                    setLista(lista => [...lista, user]);
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });

            let ventasRef = await firestore.collection('completa');
            let allVentas = ventasRef.get()
            .then(snapshot => {
                snapshot.forEach(doc2 => {
                    let venta = {
                        id: doc2.id,
                        data: doc2.data()
                    }

                    setVentas(ventas => [...ventas, venta]);
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
        }
        
        fetchData();
    }, [])

    return(
        <section className="clientespage">
            <div className="lista">
                <div className="titulo">
                    <p>Clientes RedStore</p>
                </div>
                <div className="clientes">
                    <table>
                        <thead>
                            <tr>
                                <td>ID venta</td>
                                <td>ID usuario</td>
                                <td>Estado</td>
                                <td>Ciudad</td>
                                <td>Dirección de envio</td>
                                <td>Total de la venta</td>
                                <td>Fecha</td>
                            </tr>
                        </thead>
                        <tbody>
                            {ventas.map((v, i) => (
                            <tr key={i}>
                                <td>{v.id}</td>
                                <td>{v.data.user}</td>
                                <td>{v.data.estado}</td>
                                <td>{v.data.ciudad}</td>
                                <td>{v.data.direccion}</td>
                                <td>${v.data.total}.00</td>
                                <td>{v.data.date}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Ventaspage;