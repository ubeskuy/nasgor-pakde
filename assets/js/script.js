        let cart = {};
        let cartCount = 0;

        function updateQuantity(item, price, change) {
            if (!cart[item]) {
                cart[item] = {
                    quantity: 0,
                    price: price
                };
            }

            const newQuantity = cart[item].quantity + change;
            
            if (newQuantity >= 0) {
                cart[item].quantity = newQuantity;
                if (change > 0) cartCount++;
                if (change < 0) cartCount--;
                
                document.getElementById(`qty-${item}`).textContent = cart[item].quantity;
                
                if (cart[item].quantity === 0) {
                    delete cart[item];
                }

                updateOrderSummary();
            }
        }

        function updateOrderSummary() {
            const summaryDiv = document.getElementById('orderSummary');
            const whatsappButton = document.getElementById('whatsappButton');
            
            if (cartCount === 0) {
                summaryDiv.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                        <p>Keranjang belanja masih kosong</p>
                    </div>
                `;
                whatsappButton.disabled = true;
                return;
            }

            let summaryHTML = '';
            let total = 0;

            for (const item in cart) {
                const subtotal = cart[item].price * cart[item].quantity;
                total += subtotal;
                summaryHTML += `
                    <div class="order-item">
                        <div>
                            ${item} x${cart[item].quantity}
                        </div>
                        <div>
                            Rp ${subtotal.toLocaleString()}
                        </div>
                    </div>
                `;
            }

            summaryHTML += `
                <div class="order-item total-section">
                    <div>Total</div>
                    <div>Rp ${total.toLocaleString()}</div>
                </div>
            `;

            summaryDiv.innerHTML = summaryHTML;
            whatsappButton.disabled = false;
        }

        function sendToWhatsApp() {
            let message = "Pakde Saya Mau Pesan:%0A";
            let total = 0;

            for (const item in cart) {
                const subtotal = cart[item].price * cart[item].quantity;
                message += `- ${item} (${cart[item].quantity}x): Rp ${subtotal.toLocaleString()}%0A`;
                total += subtotal;
            }

            message += `%0ATotal: Rp ${total.toLocaleString()}`;
            
            // Ganti nomor WhatsApp di bawah ini dengan nomor yang diinginkan
            window.open(`https://wa.me/6281222430260?text=${message}`);
        }

        // Smooth scroll untuk navigasi
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });