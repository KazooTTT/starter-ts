import fs from 'node:fs/promises'

const pkg_placeholder = 'pkg_placeholder'
const descritpion = `_description_`
const author = 'kazoottt'
const email = 'work@kazoottt.top'

const CONTRIBUTING: string | null = null

const currentYear = new Date().getFullYear()

const packageJsonToReplace = {
  name: pkg_placeholder,
  description: descritpion,
  author: `${author} <${email}>`,
  funding: `https://afdian.net/a/${author}`,
  repository: `git+https://github.com/${author}/${pkg_placeholder}.git`,
  bugs: `https://github.com/${author}/${pkg_placeholder}/issues`,
}

const funding: Record<string, string | string[]> = {
  github: 'kazoottt',
  custom: [`https://afdian.net/a/${author}`],
}

function replaceReadme() {
  const readmeContent = `# ${pkg_placeholder}

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

${descritpion}

## License

[MIT](./LICENSE) License © ${currentYear}-PRESENT [${author}](https://github.com/${author})

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/${pkg_placeholder}?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/${pkg_placeholder}
[npm-downloads-src]: https://img.shields.io/npm/dm/${pkg_placeholder}?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/${pkg_placeholder}
[bundle-src]: https://img.shields.io/bundlephobia/minzip/${pkg_placeholder}?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=${pkg_placeholder}
[license-src]: https://img.shields.io/github/license/${author}/${pkg_placeholder}.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/${author}/${pkg_placeholder}/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/${pkg_placeholder}
`
  // Write README content to a file
  fs.writeFile('README.md', readmeContent)
    .then(() => console.log('README file written successfully'))
    .catch(err => console.error('Error writing README file:', err))
}

function replaceLicense() {
  const readmeContent = `MIT License

Copyright (c) ${currentYear} ${author} <https://github.com/${author}>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`

  // Write README content to a file
  fs.writeFile('LICENSE', readmeContent)
    .then(() => console.log('LICENSE file written successfully'))
    .catch(err => console.error('Error writing LICENSE file:', err))
}

function replacePackage() {
  fs.readFile('package.json', 'utf8').then((data) => {
    const packageJSON = JSON.parse(data)
    const newPackageJSON = {
      ...packageJSON,
      ...packageJsonToReplace,
    }
    fs.writeFile('package.json', JSON.stringify(newPackageJSON, null, 2))
      .then(() => console.log('package.json file written successfully'))
      .catch(err => console.error('Error writing package.json file:', err))
  })
}

function replaceFunding() {
  const fundingContent = Object.entries(funding).map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`
    }
    return `${key}: ${value}`
  }).join('\n')

  fs.writeFile('.github/FUNDING.yml', fundingContent)
    .then(() => console.log('FUNDING file written successfully'))
    .catch(err => console.error('Error writing FUNDING file:', err))
}

function replaceContributing() {
  if (CONTRIBUTING) {
    fs.writeFile('CONTRIBUTING.md', CONTRIBUTING)
      .then(() => console.log('CONTRIBUTING file written successfully'))
      .catch(err => console.error('Error writing CONTRIBUTING file:', err))
  }
  else {
    fs.rm('CONTRIBUTING.md')
      .then(() => console.log('CONTRIBUTING file deleted successfully'))
      .catch(err => console.error('Error deleting CONTRIBUTING file:', err))
  }
}

function main() {
  replaceReadme()
  replaceLicense()
  replacePackage()
  replaceFunding()
  replaceContributing()
}

main()
