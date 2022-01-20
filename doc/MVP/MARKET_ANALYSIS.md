# Market Analysis

## Payment Market

Industry Analysis: [Digital Payment Solutions Market](https://www.grandviewresearch.com/industry-analysis/digital-payment-solutions-market)
- The global digital payment market size was valued at USD 58.30 billion in 2020
- It is expected to expand at a compound annual growth rate (CAGR) of 19.4% from 2021 to 2028
- Governments across the globe are undertaking initiatives to digitize payments
- Increasing e-commerce sales worldwide is also one of the major factors driving the market growth in recent days
- The point of sales segment dominated the market in 2020 and accounted for more than 52.0% share of the global revenue. 
Point of sales includes the systems used by retail stores for processing transactions.
- The large enterprises segment dominated the market in 2020 and accounted for more than 60.0% share of the global revenue.

Research: [Average Credit Card Processing Fees and Costs](https://www.fool.com/the-ascent/research/average-credit-card-processing-fees-costs-america/)
- The typical credit card processing fee ranges from about 1.3% to 3.5%, plus the payment processor's cut, which varies depending on the card processor and plan you choose.
- To accept credit card payments, merchants must pay interchange fees, assessment fees, and processing fees. These fees go to the card's issuing bank, the card's payment network, and the payment processor.
- Payment processing fees are the only negotiable credit card transaction fees.
- American Express cards have the highest average fees, while Visa tends to be the lowest.
- There are four types of pricing models that payment processors use: interchange-plus, flat rate, subscription, and tiered.

The payment market is multi-billion industry with moderate expected growth. It's currently dominated by big companies taking
60% of revenue. The big chunk of the revenue comes from point of sales segment(52%). The significant growth happens in 
e-commerce segment. The fees are quite high and range from 1.3% to 3.5%. The negotiation of payment fees seems limited. The
digital payments are propagated by governments, however it does not clearly translate into support towards crypto payments.

## Crypto Payment Market

Article: [Visa surver shows that 24% of SMBs plan to accept crypto payments](https://cointelegraph.com/news/visa-survey-shows-that-24-of-smbs-plan-to-accept-crypto-payments?fbclid=IwAR0w0Q_oSvMGQEV6pRIak64WZr-XDNse3OWuWLGoRhiWFDmFmyna6H8YBxg)
- 24% of SMBs plan to accept crypto payments
- high demand for cryptocurrency payment abilities among both crypto holders and non-holders
- 50% of participants noted that there are not enough businesses that accept crypto
- 73% of respondents stated that accepting new forms of digital payment options is a key factor that will affect business growth
- 82% said they plan to implement a form of digital payment option in 2022
- 41% also indicated that customers had abandoned a purchase in physical stores where digital payments were unavailable

One forth of small businesses plan to accept crypto payments. There is high demand, however there is little businesses that
accept crypto at the moment. The businesses are looking for new forms of digital payments. This does not mean that they 
will choose crypto payments. The customers are abandoning stores that do not accept digital payments.

## Crypto Payment Standards

### EIP-681

[EIP-681: URL Format for Transaction Requests](https://eips.ethereum.org/EIPS/eip-681)
- easy way of requesting payment or execution contract code
- it can be delivered as a link/qrcode or web3 enabled page
- payment can be validated on chain by filtering on transaction made's or contract events
- there is very limited support to EIP-681 in current mobile wallets
- high fees on Ethereum mainnet make this solution unworkable, however payment protocol can be run on L2 and other L1s like
Polygon
- possible automation:
    - swap to stable
    - deposits at Aave or Compound
    - stake ETH

#### Wallet Support

**Metamask:** Implemented
**Coinbase Wallet:** Not Implemented
**Status:** Not Implemented

The EPI-681 provides easy way of requesting payment or contract execution. This standard can be used to request payments
from friends as well in more sophisticated cases where payment is done on site, or on the web page. The only fees incurred
by client would be transaction cost + protocol fee. At current level of transaction fees on Ethereum minenet this standard
can not be used as fees would greatly outweigh the transaction amount. The only way to make it viable would be to use other
L2 such as Arbitrum, Optimism, zkSync or L1s such us Polygon. The most promising network at the moment would be Polygon as
it has the lowest fees. Provided the cheapest chain is used there is great opportunity to reduces fees and provide automation
that would increase business profitability and quite possibly could also reduce prices when client pay with crypto. The other
significant problem is lack of necessary support for EIP-681 in current mobile wallets. This could be fixed with cooperation
with BanklessDAO by setting set of bounties to implement EIP-681 in mayor mobile wallets as well as direct talks with 
stakeholders.

