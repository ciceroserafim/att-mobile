import React from "react";
import { SafeAreaView, FlatList, Text, View, ActivityIndicator, StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

//Instância do QueryClient
const queryClient = new QueryClient();

// Função para buscar usuários
const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Erro ao buscar usuários");
  }
  return response.json();
};

// Componente que mostra os usuários
function UsersList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Carregando usuários...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>Erro ao carregar usuários</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>Email: {item.email}</Text>
          <Text>Cidade: {item.address.city}</Text>
        </View>
      )}
    />
  );
}

// App principal com QueryClientProvider
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Lista de Usuários</Text>
        <UsersList />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFC4CA",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
});

