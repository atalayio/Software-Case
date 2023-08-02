import { useState } from "react";
import "./App.css";
const containerStyle = {
  alignItems: "center",
  justifyContent: "center",
  borderWidth: "1px",
  borderRadius: "30px",
  borderStyle: "solid",
};

const inputStyle = {
  padding: "10px",
  margin: "20px",
};

const centerItems = {
  display: "flex",
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
};

interface Content {
  color: string;
  amount: number;
}

interface Product {
  name: string;
  model: string;
  description: string;
  content: Content[];
}

const App: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    model: "",
    description: "",
    content: [],
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [showPreview, setShowPreview] = useState<boolean>(false);

{/*  Tab-1 */}
  return (
    
    <div style={{ display: "flex", flexDirection: "column", gap: 50 }}>
      <div style={containerStyle}>
        <div style={centerItems}>
          <h2>Ürün Ekle</h2>
        </div>
        <input
          style={inputStyle}
          type="text"
          placeholder="Ürün Adı"
          onChange={(e) => {
            setProduct({ ...product, name: e.target.value });
          }}
        />
        <input
          style={inputStyle}
          type="text"
          placeholder="Ürün Model Adı"
          onChange={(e) => {
            setProduct({ ...product, model: e.target.value });
          }}
        />
        <textarea
          onChange={(e) => {
            setProduct({ ...product, description: e.target.value });
          }}
          style={{
            marginBottom: -50,
            marginLeft: 20,
            marginRight: 20,
            height: 70,
            resize: "none",
          }}
          placeholder="Ürün Açıklaması"
        ></textarea>
        <div style={centerItems}>
          <button
            style={{ width: 200, height: 50, marginLeft: 50, margin: 20 }}
            onClick={() => {
              setProducts([...products, product]);
            }}
          >
            Ekle
          </button>
        </div>
      </div>
      {/*  Tab-2 */}
      <div style={containerStyle}>
        <div style={centerItems}>
          <h2>Ürün İçeriği Ekle</h2>
        </div>
        <select
          style={{ marginLeft: 20, marginRight: 20 }}
          onChange={(e) => {
            setSelectedProduct(products.find((p) => p.name === e.target.value));
          }}
        >
          <option value="">Ürün Seçin</option>
          {products.map((p) => (
            <option key={`option-${p.name}`} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
        <input
          style={inputStyle}
          type="text"
          placeholder="Renk"
          onChange={(e) => setSelectedColor(e.target.value)}
        />
        <input
          style={inputStyle}
          type="number"
          placeholder="Adet"
          onChange={(e) => setSelectedAmount(parseInt(e.target.value))}
        />

        <div style={centerItems}>
          <button
            style={{ width: 200, height: 50, marginLeft: 50, margin: 20 }}
            onClick={() => {
              setShowPreview(true);
              setProducts(
                products.map((p) =>
                  p.name === selectedProduct?.name
                    ? {
                        ...p,
                        content: [
                          ...p.content,
                          { color: selectedColor, amount: selectedAmount },
                        ],
                      }
                    : p
                )
              );
            }}
          >
            Ekle
          </button>
        </div>
      </div>
      {/* Tab-3  */}
      {showPreview && (
        <div style={containerStyle}>
          <div style={centerItems}>
            <h2>Önizleme</h2>
          </div>

          <div>
            <div style={{ ...centerItems, flexDirection: "column" }}>
              <h3>Ürün Adı: {selectedProduct?.name}</h3>
              <p>Ürün Modeli: {selectedProduct?.model}</p>
              <p>Ürün Açıklaması: {selectedProduct?.description}</p>

              {products
                .find((v) => v.name === selectedProduct?.name)
                ?.content.map((v, i) => {
                  return (
                    <div key={`content-${i}`}>
                      <p>Renk: {v.color}</p>
                      <p>Adet: {v.amount}</p>
                    </div>
                  );
                })}
            </div>
            <div style={centerItems}>
              <button
                style={{ width: 200, height: 50, marginLeft: 50, margin: 20 }}
                onClick={() => {
                  setShowPreview(false);
                  setProducts(
                    products.filter(
                      (item) => item.name !== selectedProduct?.name
                    )
                  );
                }}
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
