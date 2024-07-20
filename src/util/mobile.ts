export function onMobileDevice() {
   return window.innerWidth <= 1200 ||/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}