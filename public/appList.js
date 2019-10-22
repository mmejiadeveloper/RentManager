const app = new Vue({
    el: '#app',
    data: {
        opciones: [],
        link: '',
        pagina: 1,
        numero: 7,
    },
    mounted: () => {
        (async() => {
            const rawResponse = await fetch('loadOptions', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const content = await rawResponse.json();
            app.opciones = content.data;
        })();
    },
    methods: {
        edit(id) {
            location.href = 'create?e=' + id;
        },
        buscar() {
            const link = this.link;
            (async() => {
                const rawResponse = await fetch('filter', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        link
                    })
                });
                const content = await rawResponse.json();
                app.opciones = content.data;
            })();
        },
        optionState(arg) {
            let style = '';
            switch (arg) {
                case 1:
                    style = 'cDis';
                    break;
                case 3:
                    style = 'cPed';
                    break;
                case 5:
                    style = 'cNoDis';
                    break;
            }
            return style;
        },
        borrarYRebuscar() {
            this.link = '';
            this.buscar();
        },
        redondear_numero(num, precision) {
            precision = Math.pow(10, precision);
            return Math.ceil(num * precision) / precision;
        },
    }
});