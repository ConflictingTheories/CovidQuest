export __MAIN_DIR=$(pwd)

cd ${__MAIN_DIR}
yarn

# react-native link
# react-native-rename -b com.kderbyma.covidquest

# npx jetifier

react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
react-native start 