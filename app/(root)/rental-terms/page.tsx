import { Button, Container, Title } from '@/shared/components';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components/ui/tabs';
import Link from 'next/link';

/**
 * Отрисовывает страницу условий аренды.
 * 
 * Эта страница отображает различные условия и положения аренды, такие как 
 * требования к водителю, территориальные ограничения, информацию об 
 * страховании, условия оплаты и дополнительную информацию. Каждый раздел 
 * отображается в интерфейсе вкладок для удобной навигации.
 * 
 * @returns {JSX.Element} Компонент страницы условий аренды.
 */

export default function RentalTerms() {
	return (
		<Container>
			<div className="flex flex-col items-center justify-center mt-3">
				<Title
					text="Условия аренды"
					size="lg"
					className="font-extrabold mt-10 mb-2"
				/>
				<Tabs defaultValue="driver">
					<TabsList className="w-full grid grid-cols-5 gap-2 h-12 text-black">
						<TabsTrigger value="driver" className="text-base h-10">
							Требования к водителю
						</TabsTrigger>
						<TabsTrigger value="territory" className="text-base h-10">
							Территориальные ограничения
						</TabsTrigger>
						<TabsTrigger value="insurance" className="text-base h-10">
							Страхование
						</TabsTrigger>
						<TabsTrigger value="payment" className="text-base h-10">
							Условия оплаты
						</TabsTrigger>
						<TabsTrigger value="additional" className="text-base h-10">
							Дополнительно
						</TabsTrigger>
					</TabsList>
					<TabsContent value="driver" className="w-full h-10">
						<div className="flex flex-col ml-5 bg-secondary-foreground p-5 w-[1200px] rounded-lg font-bold mt-10">
							<p>Для аренды автомобиля арендатору необходимо иметь при себе:</p>
							<br />
							<p>1. Паспорт, удостоверяющий личность</p>
							<p>2. Водительское удостоверение</p>
							<br />
							<p>
								3. Арендатор владеет русским языком на уровне, достаточном для
								прочтения и осознания смысла и значения условий договора аренды
							</p>
							<p>
								4. У арендатора отсутствуют предусмотренные действующим
								законодательством Республики Беларусь противопоказания для
								управления транспортными средствами
							</p>
							<p>5. Его возраст составляет не менее 18 (восемнадцати) лет</p>
							<p>
								6. Он соответствует требованиям, предъявляемым действующим
								законодательством Республики Беларусь к лицу, которое вправе
								управлять транспортными средствами
							</p>
						</div>
					</TabsContent>
					<TabsContent value="territory" className="w-full">
						<div className="flex flex-col ml-5 bg-secondary-foreground p-5 w-[1200px] rounded-lg font-bold mt-10">
							<p>
								Транспортное средство предоставляется Арендатору для
								эксплуатации в пределах Республики Беларусь
							</p>
							<p>
								Так же возможен выезд за пределы Республики Беларусь по
								предварительной договоренности
							</p>
						</div>
					</TabsContent>
					<TabsContent value="insurance" className="w-full">
						<div className="flex flex-col ml-5 bg-secondary-foreground p-5 w-[1200px] rounded-lg font-bold mt-10">
							<p>Все транспортные средства застрахованы по КАСКО</p>
							<br />
							<p>
								КАСКО — это комплексное страхование транспортного средства,
								призванное компенсировать расходы на ремонт в большинстве
								непредвиденных случаев.
							</p>
							<br />
							<p>
								По договору страхования КАСКО возмещаются расходы, связанные с
								повреждением или утратой транспортного средства в результате:
							</p>
							<br />
							<li>
								ДТП (по любой вине), боя остекления (в том числе отлетевшими
								из-под колес камнями), аварии, пожара, взрыва, стихийных
								бедствий, аварии инженерных систем (водопроводных, отопительных
								и др.);
							</li>
							<li>
								Неправомерных действий третьих лиц, хищения отдельных агрегатов,
								частей, узлов, деталей транспортного средства (дополнительного
								оборудования);
							</li>
							<li>Угона или хищения транспортного средства.</li>
						</div>
					</TabsContent>
					<TabsContent value="payment" className="w-full">
						<div className="flex flex-col ml-5 bg-secondary-foreground p-5 w-[1200px] rounded-lg font-bold mt-10">
							<div className="">
								<p>Автомобили сдаются в аренду при условии полной предоплаты</p>
								<p>Оплата производится только в белорусских рублях</p>
								<br />
							</div>
							<div>
								<div className="bg-zinc-800 p-5 rounded-lg w-[350px]">
									<p>В тарифы аренды включены:</p>
									<li>Плата за пользование автомобилем</li>
									<li>Техническое обслуживание;</li>
									<li>Страхование</li>
								</div>
								<div className="bg-zinc-800 mt-6 p-5 rounded-lg w-[350px]">
									<p>В тарифы аренды не включены:</p>
									<li>Стоимость топлива</li>
									<li>Плата за парковки</li>
									<li>Штрафы</li>
								</div>
							</div>
						</div>
					</TabsContent>
					<TabsContent value="additional" className="w-full">
						<div className="flex flex-col ml-5 bg-secondary-foreground p-5 w-[1200px] rounded-lg font-bold mt-10">
							<p>
								Транспортные средства предоставляется в аренду в технически
								исправном состоянии и в чистом виде. Все наши автомобили
								укомплектованы знаком аварийной остановки, аптечкой,
								огнетушителем, запасным колесом, домкратом, баллонным ключом,
								автомагнитолой
							</p>
							<br />
							<p>
								ТС предоставляется Арендатору для эксплуатации по дорогам общего
								пользования, имеющим твердое дорожное покрытие (асфальт, бетон).
							</p>
							<br />
							<p>
								Желаете узнать больше об условиях проката и просто
								проконсультироваться со специалистом? Звоните нам, и мы с
								радостью ответим на все Ваши вопросы!
							</p>
							<br />
							<div className="bg-zinc-800 mt-6 p-5 rounded-lg w-[350px]">
								<p className="mb-2">Контакты:</p>
								<li>+375 (33) 333 33 33 - МТС, A1, Life</li>
								<li>г. Витебск, ул. Нововитебская, 138А</li>
								<li>vibecars@example.com</li>
							</div>
						</div>
					</TabsContent>
				</Tabs>
				<Link href="/">
					<Button
						variant="secondary"
						className="absolute top-[700px] left-[870px] items-center gap-2 text-zinc-800 mt-6 w-[200px]">
						На главную
					</Button>
				</Link>
			</div>
		</Container>
	);
}
