use wasm_bindgen::prelude::*;
// extern crate serde_json;
#[macro_use]
extern crate serde_derive;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
    pub fn alert(s: &str);

}


#[derive(Debug, Serialize, Deserialize)]
pub struct Element {
    name: String,
}

#[wasm_bindgen]
pub fn greet(name: &JsValue) -> f64 {

    let mut ss: Element = name.into_serde().unwrap();
    ss.name = String::from("rust");
    log(&format!("2, {:?}!", ss));
    return 1.0;
}


#[wasm_bindgen(module = "/core/index.js")]
extern "C" {
    pub fn ll() -> JsValue;

}


#[wasm_bindgen(start)]
pub fn start() {
    let a = ll();
    let mut ss: Element = a.into_serde().unwrap();
    log(&format!("1, {:?}!", ss));
}