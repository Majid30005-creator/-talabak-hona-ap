export default {
  expo: {
    name: "طلبك هنا",
    slug: "talabak-hona",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./icon.png.PNG",
    userInterfaceStyle: "light",
    ios: {
      supportsTablet: false,
      bundleIdentifier: "com.talabakhona.app",
      buildNumber: "1",
      infoPlist: {
        NSCameraUsageDescription: "يستخدم تطبيق طلبك هنا الكاميرا لإضافة الصور.",
        NSPhotoLibraryUsageDescription: "يستخدم تطبيق طلبك هنا مكتبة الصور لإرفاق الصور.",
        NSMicrophoneUsageDescription: "يستخدم تطبيق طلبك هنا الميكروفون للتسجيل الصوتي."
      }
    }
  }
};
