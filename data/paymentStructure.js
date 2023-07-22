const paymentHtml = `<section class="payment-dashboard">
<div class="payment-dashboard__header">
  <p>Payments</p>
  <aside class="payment-dashboard__header--user-info">
    <div class="user-greeting-name">
      <span>Good evening, Jatin</span>
    </div>
    <div class="user-img">
      <img src="./assets/user-img.png" alt="user-img">
    </div>
  </aside>
</div>
<article class="widgets-wrapper">
  <div class="widgets">
    <div class="widget">
      <div class="amount-wrapper">
        <div class="total-amount-details">
          <p>Total Received</p>
          <h2>84,254.58</h2>
          <span class="pill pill-with-background pill-background-greenish color-green">+10% since last
            month</span>
        </div>
        <div class="pending-amount-details">
          <div class="pending-details">
            <span class="pill pill-without-border">Pending</span>
            <p>15,000.00</p>
          </div>
          <div class="draft-details">
            <span class="pill pill-without-border color-gray">In drafts</span>
            <p>1,000.00</p>
          </div>
        </div>
      </div>
    </div>
    <div class="widget">
      <div class="payment-merchant-info">
        <div class="merchant-details">
          <p>Powered by Quickpay</p>
          <span class="pill pill-with-background pill-background-blueish">Integration</span>
        </div>
        <div class="more-info">
          <p>Quickpay lets you receive payments on the fly.</p>
          <p>Easily generate invoices that are print-ready, or simply
            share payment link via SMS/E-mail to request payment.</p>
        </div>
      </div>
    </div>
  </div>
</article>
<article class="invoice-wrapper">
  <div class="invoice-wrapper__header">
    <div class="invoice-title">
      <h3>Invoices</h3>
      <p>Find your recent transactions below.</p>
    </div>
    <div class="new-invoice-button">
      <h4 role="button" class="btn btn-blue-background color-white">+ NEW INVOICE</h4>
    </div>
  </div>
  <div class="invoice-search-filter">
    <div class="search-input-wrapper">
      <input type="text" name="search-invoice" id="searchInvoice" placeholder="Search Invoices">
    </div>
    <div class="invoice-filter-wrapper">
      <div class="selected-option" id="customSelectBtn" data-value="this-week"><span>This week</span></div>
      <ul role="listbox" class="custom-select">
        <li role="option" data-value="last-week">Last week</li>
        <li role="option" data-value="date-range">Date range</li>
        <li role="option" data-value="all-time">All time</li>
      </ul>
    </div>

  </div>
  <div class="invoice-record">
    <div class="invoice-record__wrapper">
      <div class="invoice-record__header">
        <ul>
          <li class="invoice-number">Invoice Number</li>
          <li class="invoice-date">Date</li>
          <li class="invoice-client">Client</li>
          <li class="invoice-amount">Amount</li>
          <li class="invoice-status">Status</li>
        </ul>
      </div>
      <div class="invoice-record__lists-wrapper">
        <div class="invoice-record__lists">
        </div>
      </div>
    </div>
  </div>
</article>
</section>`;
