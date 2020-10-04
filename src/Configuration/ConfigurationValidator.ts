import Configuration from './Configuration';

export default class ConfigurationValidator {
  public static validate(config: Configuration): Error | null {
    if (typeof config.refresh !== 'number') {
      return new Error('Refresh value must be a number.');
    }

    for (const rule of config.rules) {
      if (!rule.condition || !rule.text || typeof rule.text !== 'object') {
        return new Error('A rule must be composed of a condition and a corresponding text keys.');
      }
    }

    return null;
  }
}
