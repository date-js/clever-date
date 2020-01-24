import Rule from '../Rule/Rule';

export default class Configuration {
  public refresh: number;

  public rules: { [key: string]: Rule[] } = {};
}
