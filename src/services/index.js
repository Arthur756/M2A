import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

api.interceptors.request.use(function (config) {

  if (localStorage.getItem('token')) {
    config.headers = {
      ...config.headers,
      'Authorization': `Token ${localStorage.getItem('token')}`,
    };
  }

  return config;
});

class Services {
  // ----------- EMPRESAS -----------
  static async getEmpresas(filters) {
    for (let filter in filters) {
      if (filters.hasOwnProperty(filter)) {
        if (!filters[filter]) {
          delete filters[filter];
        }
      }
    }
    return await api.get('/empresas', {params: filters});
  }

  static async getEmpresaFKS() {
    return await api.get('/empresafks');
  }

  static async deleteEmpresa(id) {
    return await api.delete(`/empresas/${id}`);
  }

  static async createEmpresa(data) {
    return await api.post(`/empresas/`, data);
  }

  // ----------- AUTH -----------

  static async getDiagnosticos(filters) {
    for (let filter in filters) {
      if (filters.hasOwnProperty(filter)) {
        if (!filters[filter]) {
          delete filters[filter];
        }
      }
    }
    return await api.get('/diagnosticos', {params: filters || {}});
  }

  // ----------- AUTH -----------
  static async login(loginData) {
    return await api.post('/auth/', loginData);
  }

  static async getUser() {
    return await api.get('/usuarios/get_usuario');
  }

  static async getUserFks() {
    return await api.get('/usuarios/get_fks');
  }

  static async updateUser(id, data) {
    return await api.put(`/usuarios/${id}`, data);
  }

  static async changePassword(data) {
    return await api.put(`/usuarios/change_password/`, data);
  }

  // ----------- QUESTIONARIO -----------
  static async getQuestionario(empresaId) {
    return await api.get(`/empresas/${empresaId}/get_questionario/`);
  }

  static async responderQuestionario(questionarioId, data) {
    return await api.post(`/questionarios/${questionarioId}/responder/`, data);
  }
}

// const services = new Services()

// export default services;
export default Services;
