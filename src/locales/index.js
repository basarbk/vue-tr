import { createI18n } from 'vue-i18n'
import en from './translations/en.json'
import tr from './translations/tr.json'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en,
    tr
  }
})

export default i18n
