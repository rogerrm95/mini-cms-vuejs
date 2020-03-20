import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: 'fontawesome',
    duration: 2000
})

Vue.toasted.register( // Mensagens padrão
    'defaultSuccess',
    data => !data.msg ? 'Operação realizada com Sucesso' : data.msg,
    { type: 'success', icon: 'check'}
)

Vue.toasted.register( // Mensagens padrão
    'defaultError',
    data => !data.msg ? 'Oh não...Ocorreu um erro inexperado' : data.msg,
    { type: 'error', icon: 'times'}
)