// Global JavaScript for Outreach Studio Sales Platform

// Mobile Navigation Toggle
function toggleMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    if (menu) {
        menu.classList.toggle("hidden");
    }
}

// FAQ Accordion Toggle
function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');
    
    const isOpen = !answer.classList.contains('hidden');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-answer').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.faq-icon').forEach(el => el.style.transform = 'rotate(0deg)');
    
    if (!isOpen) {
        answer.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
    }
}

// ROI Calculator Logic
function updateRoiCalculator() {
    const dealValueInput = document.getElementById("dealValueInput");
    const clientsClosedInput = document.getElementById("clientsClosedInput");
    
    const dealValueLabel = document.getElementById("dealValueLabel");
    const clientsClosedLabel = document.getElementById("clientsClosedLabel");
    
    const monthlyRevenueEl = document.getElementById("monthlyRevenueEl");
    const roiMultiplierEl = document.getElementById("roiMultiplierEl");
    
    if (!dealValueInput || !clientsClosedInput) return;
    
    const dealVal = parseInt(dealValueInput.value, 10);
    const clients = parseInt(clientsClosedInput.value, 10);
    
    if (dealValueLabel) dealValueLabel.innerText = "₹" + dealVal.toLocaleString('en-IN');
    if (clientsClosedLabel) clientsClosedLabel.innerText = clients + (clients === 1 ? " Client" : " Clients");
    
    const totalRev = dealVal * clients;
    if (monthlyRevenueEl) monthlyRevenueEl.innerText = "₹" + totalRev.toLocaleString('en-IN');
    
    // License cost is ₹1,999
    const roi = Math.round(((totalRev - 1999) / 1999) * 100);
    if (roiMultiplierEl) roiMultiplierEl.innerText = (roi > 0 ? "+" : "") + roi.toLocaleString('en-IN') + "%";
}

// Payment Checkout Modal
function openCheckoutModal(plan = 'lifetime') {
    const modal = document.getElementById("checkoutModal");
    if (modal) {
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    }
}

function closeCheckoutModal() {
    const modal = document.getElementById("checkoutModal");
    if (modal) {
        modal.classList.add("hidden");
        document.body.style.overflow = "auto";
    }
}

// Handle Razorpay Payment Initiation
function initiateRazorpayPayment(event) {
    if (event) event.preventDefault();
    
    const name = document.getElementById("buyerName")?.value.trim() || "";
    const email = document.getElementById("buyerEmail")?.value.trim() || "";
    const phone = document.getElementById("buyerPhone")?.value.trim() || "";
    
    if (!name || !email || !phone) {
        alert("Please fill in your name, email, and WhatsApp number for license delivery.");
        return;
    }
    
    const btn = document.getElementById("payNowBtn");
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = "<i class='fa-solid fa-circle-notch fa-spin'></i> Redirecting to Secure Payment...";
    }
    
    // Store buyer info in localStorage for seamless onboarding redirect
    try {
        localStorage.setItem("outreach_buyer_name", name);
        localStorage.setItem("outreach_buyer_email", email);
        localStorage.setItem("outreach_buyer_phone", phone);
    } catch (e) {}
    
    // Redirect to direct WhatsApp VIP instant activation or Razorpay gateway
    // In production, you can replace with your live Razorpay Payment Page URL (e.g. https://rzp.io/l/...)
    // For instant delivery, we route to WhatsApp verification & direct live Studio unlock:
    const message = encodeURIComponent(`Hi Hamza, I want to purchase Outreach Studio Pro (Commercial Lifetime License for ₹1,999).\n\nMy Details:\nName: ${name}\nEmail: ${email}\nWhatsApp: ${phone}\n\nPlease share the UPI / QR for instant activation!`);
    const waCheckoutUrl = `https://wa.me/918808129388?text=${message}`;
    
    // Redirect
    setTimeout(() => {
        window.location.href = waCheckoutUrl;
    }, 600);
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
    updateRoiCalculator();
});
