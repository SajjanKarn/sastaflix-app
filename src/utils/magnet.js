import trackersConfig from '../../config/trackers';

const generateMagnet = (hash, name, trackers = trackersConfig) => {
  const magnet = `magnet:?xt=urn:btih:${hash}&dn=${name}&tr=${trackers.join(
    '&tr='
  )}`;
  return magnet;
};

export default generateMagnet;
