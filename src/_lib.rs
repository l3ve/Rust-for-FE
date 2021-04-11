use nodejs_sys::{
    napi_callback_info, napi_create_array, napi_create_function, napi_create_int64,
    napi_create_string_utf8, napi_env, napi_get_array_length, napi_get_arraybuffer_info,
    napi_get_cb_info, napi_get_element, napi_get_named_property, napi_get_prototype,
    napi_get_undefined, napi_get_value_string_utf8, napi_has_element, napi_has_named_property,
    napi_is_array, napi_is_arraybuffer, napi_set_element, napi_set_named_property, napi_value,
};

use std::ffi::CString;

pub unsafe extern "C" fn gray(env: napi_env, info: napi_callback_info) -> napi_value {
    // creating a buffer of arguments
    let mut argc = 2 as usize;
    let mut buffer: [napi_value; 2] = std::mem::MaybeUninit::zeroed().assume_init();
    // getting arguments
    napi_get_cb_info(
        env,
        info,
        &mut argc,
        buffer.as_mut_ptr(),
        std::ptr::null_mut(),
        std::ptr::null_mut(),
    );
    println!("rust buffer:{:?}",buffer);

    let mut res: napi_value = std::mem::zeroed();
    let p = CString::new("obj").expect("CString::new failed");
    let _s = napi_get_named_property(env, buffer[0], p.as_ptr(), &mut res);

    // let mut len = 0;
    // napi_get_value_string_utf8(env, res, std::ptr::null_mut(), 0, &mut len);
    // let size = len as usize;
    // println!("size:{:?}",size);

    let mut ve: Vec<u8> = Vec::with_capacity(1 + 1);
    let raw = ve.as_mut_ptr();
    std::mem::forget(ve);
    let mut cap = 0;
    let _s = napi_get_value_string_utf8(env, res, raw as *mut i8, 1+1, &mut cap);
    let s = String::from_raw_parts(raw, cap as usize, 1 + 1);
    println!("{:?}", s);

    let mut ve: napi_value = std::mem::zeroed();
    let mut local: napi_value = std::mem::zeroed();

    let p = CString::new("Hello rust").expect("CString::new failed");
    let _s = napi_create_string_utf8(env, p.as_ptr(), 10, &mut local);
    // println!("{:?}---{:?}",s,local);
    let _s = napi_create_array(env, &mut ve);
    // println!("{:?}",s);
    let _s = napi_set_element(env, ve, 0, local);
    // println!("rust:{:?}",s);
    ve
}

#[no_mangle]
pub unsafe extern "C" fn napi_register_module_v1(
    env: napi_env,
    exports: napi_value,
) -> nodejs_sys::napi_value {
    let p = CString::new("gray").expect("CString::new failed");
    let mut local: napi_value = std::mem::zeroed();
    napi_create_function(
        env,
        p.as_ptr(),
        4,
        Some(gray),
        std::ptr::null_mut(),
        &mut local,
    );
    napi_set_named_property(env, exports, p.as_ptr(), local);
    exports
}
