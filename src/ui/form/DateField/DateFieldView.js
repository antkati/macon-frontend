import React from 'react';
import PropTypes from 'prop-types';
import './DateFieldView.scss';
import {html} from 'components';
import moment from 'moment';
import Icon from 'shared/Icon'
import enhanceWithClickOutside from 'react-click-outside';

const bem = html.bem('DateFieldView');

@enhanceWithClickOutside
export default class DateFieldView extends React.PureComponent {

    static propTypes = {
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
        ]),
        hint: PropTypes.string,
        required: PropTypes.bool,
        size: PropTypes.oneOf(['sm', 'md', 'lg']),
        disabled: PropTypes.bool,
        pickerProps: PropTypes.object,
        className: PropTypes.string,
        isInvalid: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.maxDate = moment();
        this.maxYear = this.maxDate.year();
        this.minYear = 2006;

        this.state = {
            isOpened: false,
            currentYear: this.props.input.value
                ? +this.props.input.value.split('-')[0]
                : this.maxYear
        };

        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this)
    }


    handleArrowsClick(e, direction) {

        if(!direction) return;

        if(direction === 'left') {
            if(this.state.currentYear === this.minYear) return;
            this.setState((state) => ({
                currentYear: state.currentYear - 1
            }))
        }

        if(direction === 'right') {
            if(this.state.currentYear === this.maxYear) return;
            this.setState((state) => ({
                currentYear: state.currentYear + 1
            }))
        }
    }

    getLabel([selectedYear, selectedMonth]) {
        return selectedMonth ? moment(`${selectedYear}-${selectedMonth}`).format('MMMM YYYY') : selectedYear;
    }

    handleClickOutside(e) {
        if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
            this.closeDropDown();
        }
    }


    toggleDropDown() {
        this.setState(state => ({isOpened: !state.isOpened}))
    }

    closeDropDown() {
        this.setState({isOpened: false})
    }


    render() {
        const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        let dateValues = null;
        let selectedYear = null;

        if(this.props.input.value) {
            dateValues = this.props.input.value.split('-');
            selectedYear = +dateValues[0];
        }

        return (
            <div
                className={bem.block()}
                ref={node => this.wrapperRef = node}
            >
                <span
                    className={bem.element('label')}
                    onClick={this.toggleDropDown}
                >
                    <span>
                        {`${dateValues ? this.getLabel(dateValues) : this.maxYear} г`}
                    </span>
                    <span>
                        {<Icon
                            name='filterArrow'
                            className={bem.element('arrow-icon', {
                                direction: this.state.isOpened ? 'up' : 'down',
                                color: 'red'
                            })}
                        />}
                    </span>
                </span>
                {this.state.isOpened && (
                    <div
                        className={bem.element('drop-down')}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <div className={bem(bem.element('row-year'), 'd-flex')}>
                            <div
                                className={'col-auto align-self-center ml-2'}
                                onClick={(e) => this.handleArrowsClick(e, 'left')}
                            >
                                {<Icon
                                    name='filterArrow'
                                    className={bem.element('arrow-icon', {
                                        direction: 'left',
                                        color: 'black',
                                        disabled: this.state.currentYear === this.minYear
                                    })}
                                />}
                            </div>
                            <div className={'col text-center'}>
                                <input
                                    className={bem.element('radio')}
                                    name='year'
                                    id='year'
                                    type='radio'
                                    value={this.state.currentYear}
                                    checked={!!selectedYear && selectedYear === this.state.currentYear}
                                    onChange={() => {
                                        this.props.input.onChange(`${this.state.currentYear}`);
                                    }}
                                />
                                <label
                                    className={bem.element('radio-label-year')}
                                    htmlFor='year'
                                >
                                    {this.state.currentYear}
                                </label>
                            </div>
                            <div
                                className={'col-auto align-self-center mr-2'}
                                onClick={(e) => this.handleArrowsClick(e,'right')}
                            >
                                {<Icon
                                    name='filterArrow'
                                    className={bem.element('arrow-icon', {
                                        direction: 'right',
                                        color: 'black',
                                        disabled: this.state.currentYear === this.maxYear
                                    })}
                                />}
                            </div>
                        </div>
                        <div className={'row'}>
                            {months.map((month, index) => {
                                const monthNum = index + 1;
                                const date = `${this.state.currentYear}-${monthNum}`;

                                return (
                                    <div key={index} className={'col-4 text-center'}>
                                        <input
                                            className={bem.element('radio')}
                                            name='months'
                                            id={month}
                                            type='radio'
                                            value={monthNum}
                                            checked={date === this.props.input.value}
                                            disabled={(this.maxDate - moment(date)) < 0}
                                            onChange={() => {
                                                this.props.input.onChange(date);
                                                this.closeDropDown();
                                            }}
                                        />
                                        <label
                                            className={bem.element('radio-label-month')}
                                            htmlFor={month}
                                        >
                                            {month}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        );
    }

}
