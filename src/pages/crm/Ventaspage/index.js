import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie'
import './styles.scss';

import { firestore } from './../../../firebase/utils';

const Ventaspage = props => {
    const [lista, setLista] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [dataE, setDataE] = useState([]);

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

    const setData = () => {
        var lookup = {};
        var result = [];

        ventas.forEach(item => {
            var name = item.data.estado;

            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push(name);
            }
        })

        console.log(ventas);
        console.log(result);
    }

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

                <div className="initG" onClick={setData}>
                    <button>Mostrar gráficos</button>
                </div>

                <div className="pie">
                    <ResponsivePie
                        data={[{id: 'Hola', value:1}]}
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        sortByValue={true}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        colors={{ scheme: 'reds' }}
                        borderWidth={1}
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                        radialLabelsSkipAngle={10}
                        radialLabelsTextXOffset={6}
                        radialLabelsTextColor="#333333"
                        radialLabelsLinkOffset={0}
                        radialLabelsLinkDiagonalLength={16}
                        radialLabelsLinkHorizontalLength={24}
                        radialLabelsLinkStrokeWidth={1}
                        radialLabelsLinkColor={{ from: 'color' }}
                        slicesLabelsSkipAngle={10}
                        slicesLabelsTextColor="#333333"
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                        legends={[
                            {
                                anchor: 'bottom',
                                direction: 'row',
                                translateY: 56,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: '#999',
                                symbolSize: 18,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                </div>
            </div>
        </section>
    );
};

export default Ventaspage;
