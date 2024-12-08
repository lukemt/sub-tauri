#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;

#[tauri::command]
fn hide_window(window: tauri::Window) {
    window.hide().unwrap();
}

#[tauri::command]
fn show_window(window: tauri::Window) {
    window.show().unwrap();
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle();
            let webview_window = handle.get_webview_window("main").expect("No 'main' window found");

            webview_window.set_decorations(false)?;
            webview_window.set_always_on_top(true)?;
            webview_window.set_ignore_cursor_events(true)?;

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![hide_window, show_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
