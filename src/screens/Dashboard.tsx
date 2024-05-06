import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, FlatList, ActivityIndicator, Image } from 'react-native';
import { useTypedDispatch, useTypedSelector } from '../redux';
import { Strings } from '../resources/Strings';
import { fetchDashboardData } from '../redux/Dashboard';
import { loginUpdate } from '../redux/Auth';

const Dashboard = () => {

	const [loading, setLoading] = useState(true);
	const [pageNumber, setPageNumber] = useState(1)
	const language = useTypedSelector(state => state.authReducer.loginData.language);
	const dashboardData = useTypedSelector(state => state.dashboardReducer.dashboardData);

	const dispatch = useTypedDispatch()

	useEffect(() => {
		loadDashboardData()
	}, [pageNumber])

	async function loadDashboardData() {
		try {
			await dispatch(fetchDashboardData(pageNumber, language))
		}
		finally {
			setLoading(false)
		}
	}

	const renderItem = ({ item }: { item: any }) => (
		<View style={styles.flatListContainer}>
			<Image style={styles.imageThumbnail} source={{ uri: item.imageUrl }} />
			<Text style={styles.text}>{item.title}</Text>
		</View>
	);

	return (
		<SafeAreaView style={styles.parent_view}>
			<View style={styles.headerBox}>
				<Text style={styles.heading}>{Strings.DASHBOARD_PAGE}</Text>
				<Text style={styles.heading} onPress={() => dispatch(loginUpdate(false))}>{Strings.LOG_OUT}</Text>
			</View>
			<View style={styles.container}>
				{(loading && pageNumber == 1) ? (
					<View style={styles.overlay}>
						<ActivityIndicator size="large" color="#0000ff" />
					</View>
				) : (
					<FlatList
						columnWrapperStyle={styles.dashboard_list}
						data={dashboardData}
						renderItem={renderItem}
						numColumns={2}
						keyExtractor={(item, index) => index.toString()}
						onEndReachedThreshold={0.5}
						onEndReached={() => { if (dashboardData.length > 0) setPageNumber(pageNumber + 1) }}
					/>
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	parent_view: {
		flex: 1
	},
	dashboard_list: {
		justifyContent: 'space-between'
	},
	container: {
		flex: 1,
		backgroundColor: "white",
		justifyContent: 'center',
	},
	flatListContainer: {
		backgroundColor: "lightgrey",
		marginVertical: 10,
		marginHorizontal: 10,
		paddingBottom: 32,
		borderRadius: 6,
		justifyContent: 'center',
		alignItems: "center",
		height: 150,
		width: "45%"
	},
	imageThumbnail: {
		width: "100%",
		height: "90%",
		borderTopLeftRadius: 6,
		borderTopRightRadius: 6
	},
	text: {
		fontSize: 14,
		paddingTop: 2,
		textAlign: 'left',
		alignSelf: 'flex-start',
		paddingHorizontal: 10,
	},
	heading: {
		alignItems: 'center',
		fontSize: 20,
		color: 'green',
		marginBottom: 20,
		alignSelf: "center",
		marginTop: 30
	},
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerBox: {
		flexDirection: "row",
		justifyContent: 'space-between',
		paddingHorizontal: 20
	}
});
export default Dashboard;
