import React from 'react';
import Button from '../../../components/form/button.jsx';

class TopupVirtual extends React.PureComponent {
	render() {
		return (<div id="topup">
				<h1>Top up Virtual Account</h1>
				<p>Congratulations, USD 10,000.00 has been credited into your virtual account</p>
				<div>
					<span class="topup-tile">
						<img src="../images/trading_app/cashier/ic_virtualmoney_normal.svg" width="96" height="96" />
						<p>USD $10,000.00</p>
					</span>
					<span class="topup-tile">
						<img src="../images/trading_app/cashier/ic_arrow_normal.svg" width="96" height="96" />
						<p>&nbsp;</p>
					</span>
					<span class="topup-tile">
						<img src="../images/trading_app/cashier/ic_demo_normal.svg" width="96" height="96" />
						<p>VRTC1234567</p>
					</span>
				</div>
				<div>
					<Button text="VIEW UPDATED STATEMENT" className="orange secondary" />
                                	<Button text="TRADE SMART TRADER NOW" className="orange primary" />
                            	</div>
                        </div>);
	} 
}

export default TopupVirtual; 
