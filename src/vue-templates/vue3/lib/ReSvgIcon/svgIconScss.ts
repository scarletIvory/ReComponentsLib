
const template = `.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
`;

export default {
  name: 'svgicon.module.scss',
  path: 'ReSvgIcon',
  template
};