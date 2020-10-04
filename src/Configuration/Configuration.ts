import Rule from '../Rule/Rule';

export default class Configuration {
  /**
   * Interval between new analyse (in seconds)
   */
  public refresh = 5;

  /**
   * Selector used to find date to manage
   */
  public selector = 'data-clever-date';

  /**
   * Set of rules merged in default rules
   */
  public rules: Rule[] = [];
}
