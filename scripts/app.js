const app = Vue.createApp({
        data() {
        return {
            fact: '',
            weather: {
                temperature: '',
                wind: '',
                description: ''
            },
            city: 'London',
            dictionary: {
                word: '',
                phonetic: '',
                partOfSpeech: '',
                definition: ''
            },
            searchWord: 'hello'
        }
    },
    methods: {
        getFact() {
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
                .then(response => response.json())
                .then(data => {
                    this.fact = data.text;
                });
        },
        getWeather() {
            fetch(`https://goweather.herokuapp.com/weather/${this.city}`)
                .then(response => response.json())
                .then(data => {
                    this.weather.temperature = data.temperature;
                    this.weather.wind = data.wind;
                    this.weather.description = data.description;
                });
        },
        getDefinition() {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.searchWord}`)
                .then(response => response.json())
                .then(data => {
                    const GetData = data[0];
                    this.dictionary.word = GetData.word;
                    this.dictionary.phonetic = GetData.phonetics[0]?.text || 'N/A';
                    this.dictionary.partOfSpeech = GetData.meanings[0]?.partOfSpeech || 'N/A';
                    this.dictionary.definition = GetData.meanings[0]?.definitions[0]?.definition || 'N/A';
                });
        }
    },
    mounted() {
        this.getFact();
        this.getWeather();
        this.getDefinition();
    }
}).mount('#app');
