import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import DataTable from 'react-data-table-component';
import './styles.scss';

import { firestore } from './../../../firebase/utils';

const Ventaspage = props => {
    const [lista, setLista] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [dataE, setDataE] = useState([]);
    const [gTotal, setGTotal] = useState(0);


    const columns = [
        {
            name: 'ID Venta',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'ID Cliente',
            selector: 'data.user',
            sortable: true,
        },
        {
            name: 'Estado',
            selector: 'data.estado',
            sortable: true,
        },
        {
            name: 'Ciudad',
            selector: 'data.ciudad',
            sortable: true,
        },
        {
            name: 'Dirección',
            selector: 'data.direccion',
            sortable: true,
        },
        {
            name: 'Total $',
            selector: 'data.total',
            sortable: true,
        },
        {
            name: 'Fecha',
            selector: 'data.date',
            sortable: true,
        },
    ];

    const customStyles = {
        rows: {
            style: {
                fontSize: 16,
            }
        },
        headCells: {
            style: {
                fontSize: 18,
            },
        },
    };

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
        var vtotal = 0;

        ventas.forEach(item => {
            var name = item.data.estado;

            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push({id: name, value: 1});
            } else {
                for(var i = 0; i < result.length; i++){
                    if(result[i].id == name) {
                        result[i].value++;
                    }
                }
            }

            vtotal+=item.data.total;
        })

        console.log(ventas);
        console.log(result);

        setDataE(result);
        setGTotal(vtotal);
    }

    return(
        <section className="clientespage">
            <div className="lista">
                <div className="titulo">
                    <p>Ventas RedStore</p>
                </div>
                <div className="clientes">
                    <DataTable
                        title="Lista de ventas completadas"
                        data={ventas}
                        columns={columns}
                        customStyles={customStyles}
                        pagination={true}
                        paginationPerPage={10}
                    />
                </div>
                <div className="titulo">
                    <p>Estadísticas Ventas</p>
                </div>
                <div className="initG" onClick={setData}>
                    <button>Mostrar gráficos</button>
                </div>
                <div className="titulo2">
                    <p>Ventas por mes</p>
                </div>
                <div className="pie">
                    <ResponsivePie
                        data={[{id: 'Ventas MAYO', value: 1}, {id: 'Ventas JUNIO', value:ventas.length}]}
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
                <div className="titulo2">
                    <p>Ingresos por mes</p>
                </div>
                <div className="pie">
                    <ResponsivePie
                        data={[{id: 'Ingresos MAYO', value: 8000}, {id: 'Ingresos JUNIO', value:gTotal}]}
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
                <div className="titulo2">
                    <p>Ventas por estado</p>
                </div>
                <div className="pie">
                    <ResponsivePie
                        data={dataE}
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
