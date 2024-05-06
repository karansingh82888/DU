import React, { useState } from 'react';
import { useEffect } from 'react';
import { TextInput, View, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { checkIfInputsAreValid } from '../utils';
import { useTypedDispatch, useTypedSelector } from '../redux';
import { languageUpdate, loginUpdate } from '../redux/Auth';
import { Strings } from '../resources/Strings';
import { clearDashboardData } from '../redux/Dashboard';

const Login = () => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isValid, setValid] = useState(false)
	const language = useTypedSelector(state => state.authReducer.loginData.language);
	const dispatch = useTypedDispatch()

	useEffect(() => {
		setValid(checkIfInputsAreValid(email, password))
	}, [email, password])

	return (
		<SafeAreaView style={styles.mainContainer}>
			<Text style={styles.heading}>{Strings.LOGIN_PAGE}</Text>
			<View style={styles.container}>
				<TextInput
					value={email}
					onChangeText={setEmail}
					style={styles.input}
					placeholder={Strings.ENTER_EMAIL}
					placeholderTextColor="#aaa"
				/>
			</View>
			<View style={styles.container}>
				<TextInput
					value={password}
					onChangeText={setPassword}
					style={styles.input}
					placeholder={Strings.ENTER_PASS}
					placeholderTextColor="#aaa"
				/>
			</View>
			<TouchableOpacity disabled={!isValid} onPress={() => {
				dispatch(clearDashboardData([]))
				dispatch(loginUpdate(true))
			}} style={[styles.submit_btn, { borderColor: isValid ? "green" : "lightgrey" }]}>
				<Text>{Strings.SUBMIT}</Text>
			</TouchableOpacity>

			<View style={styles.list_view}>
				<TouchableOpacity onPress={() => { dispatch(languageUpdate('En')) }} style={[styles.submit_btn, { borderColor: language == "En" ? "green" : "lightgrey" }]}>
					<Text>English</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => { dispatch(languageUpdate('Ar')) }} style={[styles.submit_btn, { borderColor: language == "Ar" ? "green" : "lightgrey" }]}>
					<Text>Arabic</Text>
				</TouchableOpacity>
			</View>

		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		marginTop: 70,
		margin: 40,
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f3f3f3',
		borderRadius: 8,
		paddingHorizontal: 14,
		marginTop: 20,
		borderWidth: 1
	},
	input: {
		flex: 1,
		color: '#333',
		paddingVertical: 10,
		paddingRight: 10,
		fontSize: 16,
	},
	icon: {
		marginLeft: 10,
	},
	heading: {
		alignItems: 'center',
		fontSize: 20,
		color: 'green',
		marginBottom: 20,
	},
	submit_btn: {
		borderWidth: 1,
		alignSelf: "center",
		paddingHorizontal: 30,
		paddingVertical: 10,
		marginTop: 40,
		borderRadius: 8,
	},
	list_view: {
		flexDirection: "row",
		justifyContent: 'space-around'
	}
});
export default Login;
