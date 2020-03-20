module.exports = app => {
    function existsOrError(value, msg) {
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }
    
    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch(msg) {
            return
        }
        throw msg
    }
    
    function equalsOrError(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }

    function testPassword(value, msg){
            if (value.length <= 10) throw msg
            if (!value.match(/[^a-zA-Z0-9]+/)) throw msg
            if (!value.match(/[a-zA-Z0-9]+/)) throw msg
    }

    function testEmail(value, msg){
        if(!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i)) throw msg
    }
    return { existsOrError, notExistsOrError, equalsOrError, testPassword, testEmail}
}