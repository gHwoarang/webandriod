from kivy.app import App
from kivy.uix.boxlayout import BoxLayout

class MainLayout(BoxLayout):
    pass

class MyApp(App):
    def build(self):
        return MainLayout()

if __name__ == '__main__':
    MyApp().run()
