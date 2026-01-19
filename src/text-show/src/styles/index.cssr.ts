import { c, cB, cE, cM } from '../../../_utils/cssr'

export default c([
  cB('text-show', `
    width: 100%;
    position: relative;
    display: block;
    color: var(--n-text-color);
    font-size: var(--n-font-size);
    line-height: var(--n-line-height);
  `, [
    cM('clickable', `
      cursor: pointer;
    `),
    cM('suffix-to-end', `
    `, [
      cE('group', `
        width: 100%;
      `, [
        cE('suffix', `
          margin-left: auto;
        `)
      ])
    ]),
    cE('content', `
      width: 100%;
      min-width: 0;
      display: flex;
      align-items: center;
    `),
    cE('group', `
      display: flex;
      min-width: 0;
      max-width: 100%;
      align-items: center;
    `),
    cE('left', `
      display: flex;
      min-width: 0;
      flex: 1 1 auto;
      align-items: center;
    `),
    cE('prefix', `
      white-space: nowrap;
    `),
    cE('suffix', `
      white-space: nowrap;
    `),
    cE('text', `
      flex: 0 1 auto;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `),
    cE('expanded', `
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      display: inline-flex;
      align-items: center;
    `, [
      cE('expanded-bg', `
        position: absolute;
        inset: 0;
        background: var(--n-expanded-color);
        border-radius: var(--n-border-radius);
        box-shadow: var(--n-expanded-shadow);
      `),
      cE('expanded-content', `
        position: relative;
        display: inline-flex;
        align-items: center;
        padding: var(--n-expanded-padding);
        white-space: nowrap;
      `),
      cE('expanded-text', `
        white-space: nowrap;
      `)
    ])
  ])
])
