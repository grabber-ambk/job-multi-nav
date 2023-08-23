//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,

  },
  env: {
    NX_INITIAL_URL:'/sample/page-1',
    NX_STATE_TYPE:'context',
    NX_FILESTACK_KEY:'Ach6MsgoQHGK6tCaq5uJgz',
    NX_LAYOUT:'default',
    NX_MULTILINGUAL:'true',
    NX_PRIMARY_COLOR:'#0A8FDC',
    NX_SECONDARY_COLOR:'#F04F47',
    NX_THEME_MODE:'light',
    NX_NAV_STYLE:'default',
    NX_LAYOUT_TYPE:'full-width',
  }
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
