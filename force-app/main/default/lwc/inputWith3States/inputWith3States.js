/**
 * @author Sean Lee
 * @date 2024-01-20
 * @description This is an LWC component where input has three states.
 */
import { LightningElement, track } from "lwc";

const PROGRAMMING_LANGUAGES = ["JAVA", "C#", "PYTHON", "C"];
export default class InputWith3States extends LightningElement {
    checked = false;
    @track selectedCheckboxes = [];
    @track programmingLanguages = PROGRAMMING_LANGUAGES.reduce(
        (varSoFar, lang) => [
            ...varSoFar,
            {
                label: lang,
                value: lang,
                checked: false
            }
        ],
        []
    );

    handleSelectUnselectAll(event) {
        let { target } = event || {},
            { checked } = target || {};
        this.checked = !!checked;
        if (this.checked) {
            this.programmingLanguages.forEach(({ value }) => {
                if (!this.selectedCheckboxes.includes(value)) {
                    this.selectedCheckboxes = [
                        ...this.selectedCheckboxes,
                        value
                    ];
                }
            });
        } else {
            this.selectedCheckboxes = [];
        }
    }

    handleCheckboxGroupChange(event) {
        let { detail } = event || {},
            { value } = detail || {};
        this.selectedCheckboxes = value;
        this.checked = this.selectedCheckboxes.length !== 0;
    }

    handleChange(event) {
        let { target } = event || {},
            { checked, dataset } = target || {},
            { label } = dataset || {};
        if (checked) {
            this.checked = true;
            if (label && !this.selectedCheckboxes.includes(label)) {
                this.selectedCheckboxes = [...this.selectedCheckboxes, label];
            }
        } else {
            this.selectedCheckboxes = [
                ...this.selectedCheckboxes.filter(
                    (selectedLabel) => selectedLabel !== label
                )
            ];
            if (!this.selectedCheckboxes.length) {
                this.checked = false;
            }
        }
    }
}
