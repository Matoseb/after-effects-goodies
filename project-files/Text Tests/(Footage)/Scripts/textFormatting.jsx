/* version 1.0 https://github.com/Matoseb/*/
Object({
  replacer: '‽', // rarely used char used for filtering
  parseText(txt, filteredRule) {
    let i = 0
    while (true) {
      try {
        const { name } = thisLayer.text.animator(++i)
        const rule = this.getRule(name)
        if (!rule || rule === filteredRule) continue
        const regExp = new RegExp(this.escapeRegExp(rule), 'g')
        txt = txt.replace(regExp, '')
      } catch (e) {
        break
      }
    }
    return txt
  },
  replaceBreaks(txt) {
    const regEx = /\r?\n|\r/g
    return txt.replace(regEx, '')
  },
  parseStyle(txt) {
    const { name } = thisProperty.propertyGroup(3)

    const rule = this.getRule(name)
    if (!rule) return thisProperty.value

    txt = this.parseText(txt, rule)

    const str = this.escapeRegExp(rule)
    const regEx = new RegExp(`${str}(.*?)${str}`, 'g')
    return this.handleString(txt, regEx, ($0, $1) =>
      this.replacer.repeat($1.length)
    )
  },
  getRule(str) {
    const match = str.match(/\[(.*?)\]/)
    if (!match) return false
    const rule = match[1]
    return rule === str ? false : rule
  },
  escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  },
  handleString(txt, regEx, replaceFunc) {
    txt = this.replaceBreaks(txt)
    txt = txt.replace(regEx, replaceFunc)
    return txt.charAt(textIndex - 1) == this.replacer ? thisProperty.value : 0
  },
})
