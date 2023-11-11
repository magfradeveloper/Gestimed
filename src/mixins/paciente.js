import { api } from 'boot/axios'

export default {
    data() {
        return {
            respuesta:false
        }
    },
    methods:{
        async registrarPacienteMix(fd){
            return await api.post("Paciente/registrarPaciente", fd, {}).then((res) => {
                return res.data
            });
        },

        async actualizarPacienteMix(idpac, txtnomEd, txtappEd, txtapmEd, txtcurpEd, fechanacEd, txtobsEd, slsangreEd){
             return await api.post("Paciente/actualizarPaciente", {
                id_paciente: idpac,
                nom_paciente: txtnomEd,
                app_paciente: txtappEd,
                apm_paciente: txtapmEd,
                curp: txtcurpEd,
                fecha_nac: fechanacEd,
                observaciones: txtobsEd,
                id_sangre: slsangreEd
             }).then((res) => {
                return res.data
            });
        },

        async verPacienteMix(idpac){
            return await api.post("Paciente/verPaciente", {
                id_paciente:idpac
             }).then((res) => {
                return res.data
            });
        }
    }
}