export class NumberParser {
  private _group: RegExp;
  private _decimal: RegExp;
  private _numeral: RegExp;
  private _index: (d: any) => any;

  constructor(locale: string) {
    const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
    const numerals = [
      ...new Intl.NumberFormat(locale, { useGrouping: false }).format(
        9876543210
      ),
    ].reverse();
    const index = new Map(numerals.map((d, i) => [d, i]));
    this._group = new RegExp(
      `[${parts.find((d) => d.type === "group")!.value}]`,
      "g"
    );
    this._decimal = new RegExp(
      `[${parts.find((d) => d.type === "decimal")!.value}]`
    );
    this._numeral = new RegExp(`[${numerals.join("")}]`, "g");
    this._index = (d) => index.get(d);
  }
  parse(value: string) {
    return (value = value
      .trim()
      .substr(1, value.length - 1)
      .replace(this._group, "")
      .replace(this._decimal, ".")
      .replace(this._numeral, this._index))
      ? +value
      : NaN;
  }
}
