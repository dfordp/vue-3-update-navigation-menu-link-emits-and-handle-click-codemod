export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Transform `use: 'raw-loader'` or `use: ['raw-loader']` to `type: 'asset/source'`
  root.find(j.ObjectExpression).forEach((path) => {
    const usePropertyIndex = path.node.properties.findIndex(
      (prop) =>
      j.ObjectProperty.check(prop) &&
      j.Identifier.check(prop.key) &&
      prop.key.name === 'use' &&
      ((j.StringLiteral.check(prop.value) &&
          prop.value.value === 'raw-loader') ||
        (j.ArrayExpression.check(prop.value) &&
          prop.value.elements.length === 1 &&
          j.StringLiteral.check(prop.value.elements[0]) &&
          prop.value.elements[0].value === 'raw-loader')),
    );

    if (usePropertyIndex !== -1) {
      // Remove `use` property and add `type: 'asset/source'`
      path.node.properties.splice(
        usePropertyIndex,
        1,
        j.objectProperty(
          j.identifier('type'),
          j.stringLiteral('asset/source'),
        ),
      );
      dirtyFlag = true;
    }
  });

  // Rename `webpack` function to `rspack`
  root.find(j.ObjectProperty, { key: { name: 'webpack' } }).forEach(
    (path) => {
      path.node.key.name = 'rspack';
      dirtyFlag = true;
    },
  );

  return dirtyFlag ? root.toSource() : undefined;
}

export const parser = 'tsx';