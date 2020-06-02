import React, { useState, useEffect } from 'react';
import './styles.scss';

import { firestore } from './../../../firebase/utils';

const Clientespage = props => {
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
                                <td>ID</td>
                                <td>Nombre</td>
                                <td>Correo</td>
                                {/* <td>Pedidos</td>
                                <td>Último pedido</td> */}
                            </tr>
                        </thead>
                        <tbody>
                            {lista.map((user, i) => (
                            <tr key={i}>
                                <td>{user.id}</td>
                                <td>{user.data.displayName}</td>
                                <td>{user.data.email}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Clientespage;