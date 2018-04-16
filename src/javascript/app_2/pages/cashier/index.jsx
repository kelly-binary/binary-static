import React from 'react';
import Button from '../../components/form/button.jsx';
import { localize } from '../../../_common/localize';

const Card = ({ title, subtitle, buttons }) => (
    <div className='card'>
        <p className='card-title'>{localize(title)}</p>
        <p className='card-subtitle'>{localize(subtitle)}</p>
        <div className='card-btn-group'>
            { buttons.map((button) => (<Button className='secondary effect' key={button.id} text={button.text} />)) }
        </div>
    </div>
);

class Cashier extends React.PureComponent {
    render() {
        return (
            <div className='default'>
                <p>View available payment methods <a href='' className='link'>here</a></p>

                <div className='grid-4'>
                    <Card
                        title='Bank-wire, credit card, e-cash wallet'
                        subtitle='Deposit or withdraw to your account via bank-wire, credit card, or e-cash wallet.'
                        buttons={[
                            { id: 'btn_deposit',  text: 'Deposit',  link: ''},
                            { id: 'btn_withdraw', text: 'Withdraw', link: ''}]}
                    />
                    <Card
                        title='Payment Agent'
                        subtitle='For e-cash methods or local currencies not supported by Binary.com.'
                        buttons={[
                            { id: 'btn_pa_deposit',  text: 'Deposit',  link: ''},
                            { id: 'btn_pa_withdraw', text: 'Withdraw', link: ''}]}
                    />
                    <Card
                        title='Transfer Between Accounts'
                        subtitle='Transfer funds between your gaming accounts and financial accounts.'
                        buttons={[{ id: 'btn_transfer',  text: 'Transfer',  link: ''}]}
                    />
                    <Card
                        title='Top up Virtual Account'
                        subtitle='Top up your virtual account with an additional USD 10,000.00 if your balance falls below USD 1,000.00.'
                        buttons={[{ id: 'btn_topup',   text: 'Get USD 10,000.00',  link: ''}]}
                    />
                    <Card
                        title='Cryptocurrency'
                        subtitle='Manage the funds in your cryptocurrency account.'
                        buttons={[
                            { id: 'btn_deposit',  text: 'Deposit',  link: ''},
                            { id: 'btn_withdraw', text: 'Withdraw', link: ''}]}
                    />
                </div>
            </div>
        );
    }
}

export default Cashier;