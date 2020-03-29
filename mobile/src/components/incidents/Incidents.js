import React, { useState, useEffect  } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import api from '../../services/api';

// não é necessário importar (1x ou 2x ou 3x) o react escolhe sozinho qual vai ser a melhor a ser utilizada
import logoImg from '../../assets/logo.png'
import styles from './stylesIncidents';
import { FlatList } from 'react-native-gesture-handler';

export default function Incidens() {
    const navigation = useNavigation();
    const [ incidents, setIncidents ] = useState([]);
    const [total, setTotal] = useState(0);
    // criando paginação infinita
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);


    function navigateToDetail(incident){
        navigation.navigate('Detail', { incident }); 
    }
    
    async function loadIncidents(){
        if(loading){
            return;
        }

        if(total > 0 && incidents.length === total){
            return;
        }
        
        const response = await api.get('incident',{
            params: {page}
        }); // enviando os dados incident para a prx tela
        
        setIncidents([ ... incidents , ... response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page +1)
        setLoading(false)
    }
    useEffect(() => {
        loadIncidents();
    }, []);



    return (
        <View style={styles.container} >
            <View styles={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos.</Text>
                </Text>
            </View>
            <Text style={styles.title}>Bem vindo !</Text>
            <Text style={styles.description}>Eascolha um dos casos abaixo e salve o dia </Text>


            <FlatList
                data={incidents}
                style={styles.incidentLists}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                keyExtractor={incidents => String(incidents.id)}
                showsVerticalScrollIndicator={false} // scroll hidden
                renderItem={({ item: incident }) => (
                    <View style={styles.incidentList}>
                        <View style={styles.incident}>
                            <Text style={styles.incidentProperty}>ONG:</Text>
                            <Text style={styles.incidentValue}>{incident.name}</Text>

                            <Text style={styles.incidentProperty}>CASO:</Text>
                            <Text style={styles.incidentValue}>{incident.title}</Text>

                            <Text style={styles.incidentProperty}>VALOR:</Text>
                            <Text style={styles.incidentValue}>{ 
                                Intl.NumberFormat('pt-BR',
                             { style: 'currency', currency: 'BRL'})
                             .format(incident.value) }</Text>

                            <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                                <Feather name="arrow-right" size={16} colo="#EO2041" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}