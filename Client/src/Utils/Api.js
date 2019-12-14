import axios from 'axios';
const URL = 'http://localhost:3000'

class Api {
	fetchAll () {
		return axios.get(`${URL}/`, {
			headers: { 'Content-Type': 'application/json' }
		})
	}

	create (data) {
		return axios.post(`${URL}/`, data, {
			headers: { 'Content-Type': 'application/json' }
		})
	}

	save (id, data) {
		return axios.put(`${URL}/${id}`, data, {
			headers: { 'Content-Type': 'application/json' }
		})
	}

	updateItem (modelId, itemId) {
		return axios.put(`${URL}/${modelId}/completed/${itemId}`, {
			headers: { 'Content-Type': 'application/json' }
		})
	}

	destroy (id) {
		return axios.delete(`${URL}/${id}`, {
			headers: { 'Content-Type': 'application/json' }
		})
	}
}

const ApiService = new Api();

export default ApiService;
