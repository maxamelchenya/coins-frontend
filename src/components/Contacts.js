import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import PageTitle from "./PageTitle";

class Contacts extends Component {

  render() {

    return (
      <div>
        <div id="contactPage" >
          <PageTitle
            title="Контакты"
            description="Появились вопросы или хотите предложить сотрудничество? Сообщите нам."
          />
          <section>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <h3>Свяжитесь с нами</h3>
                  <p>Наша платформа не осуществляет покупку (обратный выкуп) у клиентов памятных банкнот, памятных и
                    слитковых (инвестиционных) монет, а также прием указанных банкнот и монет по номинальной стоимости.
                    Исключением являются памятные монеты, поступившие из обращения и имеющие технические характеристики
                    (достоинство, диаметр, сплав, масса), аналогичные монетам в белорусских рублях (памятные монеты
                    номиналом 2 рубля), которые принимаются ОАО «АСБ Беларусбанк» по номинальной стоимости в качестве
                    законного платежного средства Республики Беларусь.</p>
                  <p>Денежные знаки разных стран — настоящая страсть для многих коллекционеров. Для настоящих ценителей
                    истории, старинных и интересных вещей на нашем сайте открыты аукционы монет в Беларуси. Любой
                    нумизмат может разместить здесь своё сообщение, пополнить коллекцию или поделиться ненужными
                    образцами.</p>
                  <div className="row m-t-40">
                    <div className="col-md">
                      <address>
                        <strong>Компания Аукциончик</strong><br/>
                        220234, Россия, г. Москва<br/>
                        Ул. Пушкина, д. 6, корп. 1<br/>
                        <abbr title="Phone">Т: 8(033) 582-91-51</abbr>
                      </address>
                    </div>
                    <div className="col-md">
                      <address>
                        <strong>Офис Аукциончик</strong><br/>
                        212042, Республика Беларусь, г. Минск<br/>
                        Проспект Мурина, д. 86, корп. 3, оф. 544<br/>
                        <abbr title="Phone">Т: 8(033) 582-94-52</abbr>
                      </address>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default withRouter(Contacts)