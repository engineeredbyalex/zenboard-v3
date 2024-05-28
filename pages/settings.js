import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SettingsPage() {
  const [products, setProducts] = useState([]);
  const [featuredProductId, setFeaturedProductId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shippingFee, setShippingFee] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetchAll().then(() => {
      setIsLoading(false);
    });
  }, []);

  async function fetchAll() {
    try {
      const productsResponse = await axios.get('/api/products');
      setProducts(productsResponse.data);

      const featuredProductResponse = await axios.get('/api/settings?name=featuredProductId');
      setFeaturedProductId(featuredProductResponse.data.value);

      const shippingFeeResponse = await axios.get('/api/settings?name=shippingFee');
      setShippingFee(shippingFeeResponse.data.value);
    } catch (error) {
      console.error("Error in fetchAll:", error);
    }
  }
  async function saveSettings() {
    setIsLoading(true);

    await axios.put('/api/settings', {
      name: 'featuredProductId',
      value: featuredProductId,
    });

    await axios.put('/api/settings', {
      name: 'shippingFee',
      value: shippingFee,
    });

    setIsLoading(false);
    window.alert('Settings saved!');
  }

  return (
    <Layout>
      <h3 className="uppercase grey_text">Setări</h3>
      {isLoading && <div />}
      {!isLoading && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-10">
            <label>Produs principal</label>
            <select value={featuredProductId} onChange={ev => setFeaturedProductId(ev.target.value)}>
              {products.length > 0 && products.map(product => (
                <option key={product._id} value={product._id}>{product.title}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-row gap-10">
            <label>Transport (in RON)</label>
            <input
              type="number"
              value={shippingFee}
              onChange={ev => setShippingFee(ev.target.value)}
            />
          </div>
          <div>
            <button onClick={saveSettings} className="btn-primary rounded-lg">
              Salvează
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}


