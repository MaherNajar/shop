import { Component } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { ToastService } from 'src/app/services/toast.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  standalone: false,
})
export class CheckOutComponent {
  isLoading = false;

  constructor(
    public cartService: ShoppingCartService,
    private orderService: OrderService,
    private locService: LocationService,
    private router: Router,
    private toastService: ToastService,
  ) {}

  async placeOrder(formData: {
    username: string;
    email: string;
    message: string;
  }): Promise<void> {
    // Validation
    if (!formData.username || !formData.email) {
      this.toastService.show(
        'Erreur',
        'Veuillez remplir tous les champs obligatoires',
      );
      return;
    }

    this.isLoading = true;
    try {
      const location = await firstValueFrom(this.locService.location$);
      const order = new Order(
        formData.username,
        formData.email,
        formData.message,
        location.ip,
        location.loc,
        this.cartService.cart,
      );
      const result = await this.orderService.placeOrder(order);
      this.toastService.show(
        'Succès',
        'Votre commande a été créée avec succès',
      );
      await this.router.navigate(['/commandes', result.id]);
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      this.toastService.show(
        'Erreur',
        'Une erreur est survenue lors de la création de la commande',
      );
    } finally {
      this.isLoading = false;
    }
  }
}
