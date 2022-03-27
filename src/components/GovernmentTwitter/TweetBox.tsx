import { FC, ReactElement, RefObject } from "react";
import { faArrowUp } from "@fortawesome/fontawesome-free-solid/faArrowUp";
import { faHeart } from "@fortawesome/fontawesome-free-solid/faHeart";
import { faReply } from "@fortawesome/fontawesome-free-solid/faReply";
import { faRetweet } from "@fortawesome/fontawesome-free-solid/faRetweet";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ContentInterface {
  content: string;
  contentContainerRef: RefObject<HTMLDivElement>;
}

export const TweetBox: FC<ContentInterface> = (props: ContentInterface): ReactElement => {
  return (
    <div className="tweet" ref={props.contentContainerRef}>
      <div className="tweet-head">
        <div className="tweet-image">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAXh3pUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjarZpndhw5e4X/YxVeAnJYDuI53oGX7+eimkkiNaPPFmfUVHc1CnjDDUCZ/T//fcx/8SfnkE1MpeaWs+VPbLH5zi/VPn/a/dvZeP++f9LrI/795X3z/oHnrcBreP5Z+uv6zvvp4wtv93Dj6/umvj7x9TWQex/4/gm6s35fnyfJ+/5538XXQG0/v+RWy+epjtdA83Xhncrr//g+redF/zZf3ihEaSVuFLzfwQV7/67PDMLzf+f/xN8uJK6z9x0fiuElBv8ajIB8Wd7bq7WfA/QlyG+/mV+j//7bL8H3/fV++CWW+RUjfvn2A5d+eT+838Z/vnF4n5H/+sFIrv62nNf/56x6zn5W12MmovlVUTfY7m0YLhyEPNyvZX4K/yd+L/en8VNtt5OULzvt4Ge65jxZOcZFt1x3x+37Ot1kitFvX3j1fvpw36uh+OYnOXIkhx93fAktrFDJ2fTbhKCsvc/F3fu2e7/JIpddjku9YzDHV378MX/68G9+zDlTIXK2vseKeXlVFtNQ5vQ3V5EQd155SzfAbz+v9NtP9aNSjVymMFcW2O14hiCXH7UVbp4D1yVenxZypqzXAISIeycm4wIZsJkecNnZ4n1xjjhWEtSZuQ/RDzLgUvKLSfoYQvam+Op1b75T3L3WJ5+93gabSEQKORRy00InWTEm6qfESg31FFJMKeVUUjWppQ7AxZxyziUL5HoJJZZUcimlllZ6DTXWVHMttdZWe/MtgIGp5VZaba317k3nRp2xOtd33hl+hBFHGnmUUUcbfVI+M8408yyzzjb78issYGLlVVZdbfXtzAYpdtxp51123W33Q62dcOJJJ59y6mmnv2ftldXffv4ia+6VNX8zpevKe9Z415TyNoQTnCTljIz56Mh4UQYoaK+c2epi9MqccmabpymSZ5JJuTHLKWOkMG7n03HvufvI3L/Km0n1X+XN/1PmjFL3/5E5Q+p+z9s3WVviuXkz9nShYmoD3TfXqbWY4+xJedmSTvUMn9eebbm9Uo4+p1gIVWqz5Ox29cPuFbavTDVE2/fKo5cKMi0Dk3DrUzar2Z4ZTOaZyXravp0D1cS+84iHezO7GM8spy0b6t6lcB0MOFI7honnYXXZYCV6nSk5vb6u4LfXJfcChuOC4kak+Vdzq3FvP7tZuZxdVp/hbGDyDuVY0f30tw8ZhqafeQHb6WMUrjPfXPjTKPcW347CdeYv50LdIERcbCc4lWwgT476zIa4ujCoxd3yocfOXu190KVXKrYR7+MtpdYOpeVEbzeaq7g5XO91G5vCcbXbpGHDK8gn9SfI6WuQVwl8a51JieY+Qu6h2F5HiMuMUvzM3NbVZMeEPff0XEwc+OXGg/ukfvVTnUvp8vddaqKP0+glas6ZFfNayXWaqOSVGgzSi++pNFCZ2i9PBb1N8zXJz8XC8lZMqJEc+v4cC8TZKxbtIxahUa4l9zlu7RPLNSjls30f9cycTaswNZVPffnhCfs5Fw8miHZGqnyDMTUc36mvG96PucGnC8wzZj+tQljNjdwgbr8If1H42z/VuHs1iWnn2yZ5euBWSHrvpz+1k/mnfmKsfO5CXC5p10ZOFcNRZwbR1tPMoxuKoRwnFGsrklLiSg24zSoFQwMUACrb2YNojJHKeMo05bDrxYHo19zbkLEHX0CtuYfwBVh3K7/DSwnb7TJjWGmkvcou3LWTVA9+0xNUTG3OoKIqM1hkGpQ9fq1Ie4WlpdNtaXl678aBOfo9mNpMNz6XAmxkCixtGb1F66nYVqmdXgOS/Wh90S8akA56GzDttwFXuQOG14AtTfCoPS1KHM+tk9AZebS8K30BRVq9RCSJuFa9b+OhuRh7BywL+QCOEezFM1S88tO3rC/b+9W/eo1IvxCVZZFCyQR8t7ilILn1huFaTQjaAqFmuvZE2YZGD1NCflAVCcBaqxOjfuumDy4KZ+5e1y4HdXE2RAJl0AGJPChOqK9RfPyUDfuRD8O/v6SDz5SONFfm26jmp7/KobVb2ZDX5RnYSzxzr5ep6Sj/RKndhHxNx5OM9XTbecvFM9w3tGV+4i3AaI4Sk0MtULGA3wihXtuX11SGwJLQNnlyG2wxJOo/yNLvr+bzG2Dphn03OmJuGBtFNEB318uC7Xdb3DTYjTBYlPMB5w7de3afZRmrdYOssydfklVjnqsy/iFhv7aP+b1/3hJ2qx28/JwwyueVMvpfSVPpKGnWfCTtpy76rol+TZ18/83eHfctfaqbX9IXJ3LNRzsbcgwZsyFUnFMHr+BuhdUc0Mwpy0ke/j9/NX+6IIZCIhvCNFIx0FfY6GQoJHsH59Z5bBjAXa9tmDzzTrMSF+GEs/uvGoNYJD4jEoaABUJR4jj64o4ZYqfkj4PMFkIZUH5DwZ9AsA7nWRoCsVLlZ87Lzw49d4dLd7h4h/OphIBaDAdZeeL+SEN+wZhRG/kHC+3/5dX88YIm/fFoj9hPbVAXgS8sKjh46zMtmN/rGnQjlqulgxe/nRDK/cZ3uIXrhNagPYPb2Ps4+Ba9Pdy9ZKEpSMgOafVq8YdSdd7Ztf0asQUYbOBTlyRJ6Ru5iDuqvvtX3YSLAkwe+b6LjfVk5gYVo57wBb0VL3lIBhtaoHmXsFZpbptxCUZKpohMMQLxIEJ7FE/b4ShEWJaMkbs0ya7XjsIsKWyKabjtCFvhBWSv1Yzu5GVwDQu+Zr2x4+D6DpivyR1Y3Rqr00jN+YmIyox5ZwE6CiCd3xGjY1SdDbKG7npEREHgdYpPosP91L1O7HP2XdGXlKh3VWU71rriC7vSN9bMN1TtjZD99hVV2nKo+mdLrAyNTA02kAAnaF1Dt9gNp3da5JFJqojBEtrywAvRAKawhfzHxGJ1yESakTss2pIIYTEBVV8OUgtCoJvRkHX5DSY36gCUKRediJr6ezMvXNRA04Q6J5W4N/MQg1b+3nOpW2zAVZplcxpxz1sT9SGl3g/oBU3PXIWu6D/0VS4A9khXvSXMKikLsWGBQcOJGKXEiJtD+0/ZTAQ81jpkj1feHlU6Y95AjS2YS3R3gjp6wxOfihV0BZkHOJxswIQ2RkS05dG0Z8aNcSO6Naui9plQdwVogE1myLvni3ktzB53gCcpuoKIsGFnVCMlTWEi+PzG+PSZJLrVmYuM+8j7zDvim8HtX3s7xzqGocEBQSqbgljqOcAxDpdfPUeZETnvB3GrdEdNx+E5Zqs7MnGrJl6ILW+a91kA8aAfWRf6ddB014z6wbDgXIjMDTENoFZ2jYJtjfJAB7AUyrgZ0gpRDcKXciXkv9B62IxTS+tUCdBo286UKYp4BQ87w1vboXeBEYQ1LXLgZ+jKI6LhK3VDQCQTRZjjcHNadTdEWwDaJoEIdwWNRATRAQs0cHsAkBmPJN0a2TGINVYRCeyKDpibaqvA8w9qROrRIAkw8BAz5m3gaSjg5uMYiFnXUsQxoG+Bfe0eQCOAhmhHTDwwhJvJgCJubRNmPG42OsS5Fu0J0JWDVSoSlIwNOA3ygOwktdQ2XA9tJpCBcaiRHa2+YOgZyx2wiiNoS5WIa/9IaAzUrAa+JjCY6sqTEQrih7bw2gjKC/HdAAfIH8FeMIxYDarR0jOjFZbn8SeZOTaEMaAwH6yjky0YhW3CBnkcZSB3c+HNV8Cuty3zi1zMYCptildmqRMYCIuvqxj5AxZStxtGSId+OXXNxbBMh+iFVfG0sBLZQ3vJ4+ocANRB/N3abdWDzog8UtGk8hwKvLHuk2sEsOBaYACA3plg0wNb1qnUC42nYQoTsSo7wI0kgxgu68nTnGmqx4jUllY6A2Wb+zroFoOW23ChB5zQE+n2FOlyroN3dSbghtVqFy5TozjqDVdCuxePmCLxmSjMrp3RVfCWcZDQtCGdmPFxiTUeAsDUl6vc1ja8ej4UbZlOlt1XQox6iGVU54Mh5cgKhO3BsxQYLw/1O31ZAR+wfPU2oRbX6Nk+OnDiKVlhDNiD5ypZQneYi0IQYCFS53WvNBRxF2POJyzccWaeRbuXCcpdR6H0BVPL0J4EV51mkesC5Lq43jzebSLAcKPWj7b4ilNjylB3kQepYJWgBfCC2c2DNfZijs85JwphZC8G8oCZxWVvHVXNjk6j2Zocvl+/q0wCiNKLNgdmVMRA2T1Sj2LCXQpXtAsYxUhTBm/YKo9bB2pzEWcSviYEWN7413xDwERUwWZZ+RFSJPsld1ofTTEgir8wM5QNlgIgDXnKNdrcBUISYuLSsQcE0ChcJHR2EznBCqilUas2ZiYUh/CxDVlD3wQpaCo40OQDRRQHA/YQPbUG1CP0YBxZEXwQkwU9JL4hz0VlzEoOtrGxNGB4hpYy5UCVLwRUw58UN5AQi5qgszLyC+k4KOIStROHGG4RDRWIhXKNqtVe6VvWGypg7zhCi4Cd7IdIqmkThL6ol8ZOnwzO8gC8SdUkmFYWQntG2rb352JksZ07V1EtepYGpCMoShZqR8/uqn4+7PQnRZDp54QVXNQRGmDR68iREzJtOwH6uAI3CxYKrjtr60f7ZmvFZiNNHgauImE25c5kwAgnA0GZPmMwKp7/IADhepgEubJA7RIlh7g3UuGNRbTkULQDHmk57fmHRvf3CGXBJ79pNtCCFnEPgyGPsbJ7evu4Rg+ZH5QEaldwVLchBO0RVzreuWX3lHds8GgZ7XgUDLX9ojs+v4QH/70oDyEHYZpfGfONMLW79Q0j7nmk2SbyviLx+JV1I8KcgZKRWshh6HpE7sHbdCpoRXHBKxlZnaSAqhi+3aqddJKDRTrdXDDidPQw8n/FozZSosoyxteHuh95txcWKuVMhXcdZm6CKr2WKsamrgGYeBSadQgwo4OSARtQGxRqowFU2SNRRdo3QHcBdShpSq3ZUOUEHtkFr3JJlSr4zdNq/5JwRA+o+0LRBJrfP7vZcD3YTsChX4f+H0pXjdiUQNiYEeh26EF8LbCKA0I2EPCWn0I7HTMcvSgWWSZPKmrdwamFKxlK1mlXWscZuluhGaaK9dDcXSdOjjioSwEv1tZx+oCkAEV+ZvUxHdazh3dYmvg12wSjt1ZpI8GP4l6RpASOFoO7kSj7gFNYc/mrEGiVA+H0vhDTisMx+OD47A5TqS8cXBsivE8e/Fbr6Uy70CVM56n01/4IVlSlvoI2Uo/NeWlBNSCgAq0J2xe0+h0ewcCiYJuvcC0Gl2EyL8B+h2t5Havtq+/aIVFcq37rpc1FqgiJISJQZEkWJ1aKv8OTiCWkEQxOqGyCMLvOr9sprEJ74IGgp43uacdop5e69vKpoHW6R2o7YDoazVSTFCo+FanYcDkNHwTioNgqydS5G1IbZCvifswd9NAPDm9jUej+KYDja16bKgg8JpJlPkgpwOSQKGgKCsyeTe0xyZPRR9xs6kGJpRTHhvmjFtBph55ETLA88iyr6Ek6AEPcFvCkM4o5tbnQWZkbpte572AoOhDYDiyxTqn6RsWsvcBVKgdXCi4NHJGecdDuutUuPi0KHQa0QzNIT5maJArf2oTtAY0ZYaBNOvJBb+LMKdoCVZC4IDzwFBt8GneUHayYkwDUph7wBoXE4lSstho0GBaLm3rYFgc3LIXWBzqABkuD7LrOshp8jEono8OZeWC2oZ167mv31KMva1F7SHVoKaJiLdPjqgH6Zh20YGQ3zYHctV7YSVZPNwSDOsKMe/h+FylecDCSnkLNUlZ6C5Km9OEYD0HtgIcQf1VKp9GR9Mkg/VDXtFRrlL6kb4l6mHQtfFHlkJ0MvEXGok03+ILkoPPr7IAOkIPjZeIdBwnQ5Oyn9j19esHdRbury3RgBeDSPAXkwqr0DHjuBOWB28gyJC9ktKNJUiy/6Dztej5HJ9J62g0tWIqIJgPlMwIfZMk6HkZVyGb2qoEKOOcoRAzp6hP4QGFKmxXtq6FIMtpc84zIvAfDPJcg9tWKoBlWC8oIuKOKHJVRTVHHydhahoPywMWoY537CFOBvum4FSK6p2MiAat5aftsqgpfY0Cd5ckJYB6dtvwmg/RrubUTaZ9DJ4rlnnKufZwOwqDlSwnoC/ccmRnyWCAqoBykB9mlaapqk871E1nqPDjgNivQllUj9Js0gh0rlRkBiIaHG92gXyqe0QEInjJFhXkZGyoalUIz2eR/3linf5E+OLiyjdN+zmiDOkR3ytJmbJDC47R2Wp6b+5dUo8KQzfjzmPHmsBoecDh5dywEbAUOgaK2V5qSsnA6DaBHdN4/cJNMWLMcCwCzBfJCX4KRSDCGBR6lFpPx20+d5iIFEYyoQLtIJI1H9RFy/EVU4WrjBhWRuVVHZk2dDyTUIy7eW6Gv2TBYAfCKQxsPPbgjwFm9B2SrX7RGeVh3DvD/FutxuWeIJKuDdIbZoRNDi+JwkjbpUQ52td2zreSWbscM5dLhWfv07hJhY2bWQvIM0AgCSgF5HQrcj+aiAKZAp1Mk6ATtCjVMI4bsqJzJPpHKFFmaR5zGkv2hZGqDQhKjgpXmUMBgqgg4JVqzVj0+MnUY2nVwDqsMRmaC0EBYbdJsiNjFpSCRHsaSDuiNGTnQGLwE0+CenUFMHDS9TSmurfOt4ZnUrHpoBexz2uONvXessoz4FGgkVO3vQpGcdAGrtKKjZcRCNDyzm0/Dt4R9QLEB269NrJHN3TneOuv+tItFOb86732zXSLDxUf1vm24t08b7gZ1u37enifeVlV/1P9IJeoEFEskkv7XnjmO+ZEqxv5xj/Xfv/4wkHdB3dVbr07zL8z/OaxYXw4r7oKvuDH3xII1FBgAdwWVo7ybSPP8w7ETMmJ/xNF8G0hA8A5RJB61Jz2Awnsw8joWkXL6ejp8xejHAXFUb3tQOWMNCgwlrR2s1w4HJYtej/U00DpgMcL+18cZ//G5CI53gQAt+iIQSz7NOKHUpo2pCqTQNpFGoia0YSJ01Wkm8taZvzzZe5063RO4L8dO5rtU/nb29GOIPyJsvpzB/7sj39fh+/t5kMo/SB7fs+/JrKOeG9SBKreldeEfuNGv/0tlf/vqhcbrEqHQHwMxKgYE27VmMXroODg9NzLAHqpSZqQhMHXs/heH7ib+1TMQP5/hmj9109+c4Zo/HeL+uzPcewSfjJDJO9dejxg9+3hDfYXdSKR2NhAspIV5n002G+p+h7WPvTLzN2e79+QfZmkVA6izdSwJKdv3CYQUEKJWDrrdh83nfd4paWMi/ZioFPPbWb0stU7rzeu43r6eGOFeeviwSoi3KDBBC+rsUN4CCj/aF/fwv042ERH40qPdK4BtiQvtuj0XRn2Z0hejLD0S2XHt/5gG8zUPpTc9jnMPMBA1qx+krAhYW0j1iuzmUDIVpwSy4PMP4rMWlsac4bSaMYgY0RW0/b814dvtAwUXyPFOANae2vjT/t+tpHCCBCQG/4I/SgAf+/7561NCqM81W3JAv2ApOzPxeoKLG94nuOa6D2jNh0W2tgHvI1zP53qE69MV+th+HuenK815RvrhPu/jDM/EcoboqUsdni0EdPm0EvPNUsLPkVAgrNyNbxnwvo+CaNNuVUOzE83USk/IFD3u9SyVglENMiQeqw1yoK07VCuC//VQodPDnigbedBpnull8WQ46ZfZcUXWxrV9PdGH1LrHEHqgL+NBhN16oM+NarAiqy4djCVt4OPioELtCY6XAtDzhdre8h3M4E5glENloWrwpN7T0Hmvvox33sWsA8lQtbMr0v+YpGKUvsSoKka49gYuuR5TcrNJRZuPKLjwisL+FAUkeM2hD8zzqHjkc/L6CDserbj7sCbuyOowqSbrhg7AZYF0dqcHPaXszwaHP/ujbz7ULYORe6nI1l86IPxtWZhXXfw20ncV9KdWMq8KO8GO53D57TGwL3Q0HuEVAARPh5MviswhKwDHZ+EGM521sZM3QC2sLKisNrXJGJ+n/YAkPi1ofbhGNutyCppUR9vrcZKRGP1T7yOkSei2bcURIVoaDtG9JTT6AqLxKau2iTtK2lTRo3YpZB0OoI352PwvST76Cm+DhXEAAAGFaUNDUElDQyBwcm9maWxlAAB4nH2RPUjDQBzFX1tLRaoOFpTqkKE6WRAVcdQqFKFCqBVadTC59ENo0pCkuDgKrgUHPxarDi7Oujq4CoLgB4iTo5Oii5T4v6TQIsaD4368u/e4ewf462Wmmh1jgKpZRjqZELK5FSH0iiB60I9BRCVm6rOimILn+LqHj693cZ7lfe7P0a3kTQb4BOIZphsW8Trx1Kalc94njrCSpBCfE48adEHiR67LLr9xLjrs55kRI5OeI44QC8U2ltuYlQyVeJI4pqga5fuzLiuctzir5Spr3pO/MJzXlpe4TnMISSxgESIEyKhiA2VYiNOqkWIiTfsJD3/U8Yvkksm1AUaOeVSgQnL84H/wu1uzMDHuJoUTQPDFtj+GgdAu0KjZ9vexbTdOgMAzcKW1/JU6MP1Jeq2lxY6A3m3g4rqlyXvA5Q4w8KRLhuRIAZr+QgF4P6NvygF9t0DXqttbcx+nD0CGukrdAAeHwEiRstc83t3Z3tu/Z5r9/QBXkHKc3vhLUAAAAAZiS0dEAAEApAA5RVfvewAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+QFDhcbKgLavM4AAAwcSURBVHja7Z17cBRVFod/t293Z95JIBBIEJAtAi7KM+EpiKxCaqUKVqhCAV1WhNLlYbmKoLwFLQREJeEZihXkIbhbgrKuK4osAYQFVll5iJSYRAK1EEiYzExPuvv23T/yWIZJQqZnJkxCTlWqMqd7ztz+5px7zz33dg85efIkzp07BwAQCAEhBPUtf5o6PdUWZ+1ICGlPCEkFeAtCiEUgAgEAgxucc+4HyFXOeSHnPM9Xppxfkb2yMFptMgwODg4AICAQypsCzjkMXq7v1KkTyM6dOzHmyScAAJ3btIckSlGFVXSjmDqs9j4ipUMEQgaAkAyBkOamLpLza+D8mMH5IZ2xfR7FezQpPpFFop3X3CW4dP0qACClWQs0dyUAADRdww8X8wAAO7Z/CLE+PKzoRjF12uxDRCqObeZKGC4QkhQJuwIhzUFIpgBkipQukiWpiBnGHp3p20p93n2RglmbRBVgqeJtaZUtk5u5EiYJhLSN9sUIhCSBkAlUkCdILqlAZyxHUf3rnVb7lah9ZjSMev1KKjPYSofFlidSuqg+4FUDs61I6SKHxZbHDLbS61dSYx5gidfj0BlbbIuz/EgFOo0QYsUdFkKIlQp0mi3O8qPO2OISr8cRkwBVXRvhstnPipTOJoTYEGNCCLGJlM522exnVV0bETMA3T5PAjPYFlmUdgmEtEGMi0BIG1mUdjGDbXH7PAl3FKBfU9MdVvsJKtBxaGBCBTrOYbWf8Gtq+h0BqOra+DhRyhUI6YAGKgIhHeJEKVfVtfH1ClDT9XmyKG0mhFjQwIUQYpFFabOm6/OiDvDqjWLojC2TRHEhAILGI0QSxYU6Y8uu3iiOHsBEh2uZSOnLaKQiUvpyosO1LCoANV2f15jh3QwxlHCuE0BV18ZLorgAd4lIorjAabOPjwhAv6amS1TMaWR93u37RCrmdExtlx4WQLfPkyCL0o7GMNqaHJ13tGvZOsE0QLvFmt2Q87xI5Il2izXbFEBV10Y0xBlGNGYsTpt9REgAS7weh0jFbDRJxcgsZtdUxakWoMNindUQCgP1WYBwWKyz6gTQ61dSqSC82ITt1lAWXqyuKBsE0CLLM2OxnhcDo7LNIsszawXo19SWAhGebcJVUygLz/o1tWWNAK2yZXIslOFj2AutVtkyuVqArROTqCAIk5ow3cYLBWFS68QkGgTQabMPCWf1LKF5M7wyfzYeeSyzsY/IbZ02+5CqFOemXGesGYPJqSmY+uILGDzkYTidTuTl5df7RXXvnY6e6b3Q7t72iJPjwBhDSUkJzpw+jQNffY3SkhuRzgvHAthbBbB1YhIlhAwPxYgz3oXXFs7DwIcegtPpBFC+b6S+JLVdWzw3bQoyemegdUpKjecpPgWnTp3C3z79FB9/+BEQgTYSQoZXhDETAcBhtfcJdbuFx12K+x/oWgWvvsRqt2PG3FcxdNiwOn221WZFRu8MZPTOwJPjxmJ1Vjb2/+PLcMM4yWG19wFwWCh3STokVCOcc/z7xIl6hffr7l2xeec2jBo9OghepffXFgWdOnfGsndW4KU5syIQxuXMxAqiA8wYOX3qFEY+/rt6gdelRze8m70SLZOTA/QXfvoJR745ghPHjiHvws+w2qx4oFs3dO/RA+kZ6WieFBhYsizj6QkTkJKSipenTDfd7VQyEyuCOsOMkVMn/1Mv8OKbJWLJ8qUB8Hw+H3LWrsPG1euCzv/+xHfYhk1wuJyYPG0KRo0eBcctHvvI0Eex4K03Mf+VV812hBkAQP+VeyjVKsfNMWND13VMmDQxQJd7IBenIwz2jbeXomevXgHwZr40A7t2fFTr+9QyFd/kHsS3332H9N694Yp3BRzvmJaGouLrOPv9KVNTu08/+WSDYIuzdjR7YbquR937Mgb0w0ODBwfo1q9ZiwN7v6qzjW+PHsNzz0xE/i0pFqUUz0/5I1yJ5nZ42OKsHQVCSPswhvOoA/zDpImQZTmgz/vzmvUh2/nl53zMnz0bnlJPgL5Fy5aY+Nxks9ffXijfk2x6WhNVeA6XEz179gzQHczNNW3v26PH8ZePgsN+aGamKWcghKQKAG8Rqx74m8yhsFgDaxuf7/ksLJtr38vC1StXA3QpqSkYPOwRE9Z4CyGcFbdoe2DX7t0DviS/34+z358Oy6bi9eHokW+C9H0H9DfjQBah8lYCcx4YXYDxCfEBrzVVg8HC3ze+/+v9Qflf27btTOSCQpgE6nmp3Wa3we4Mf4fuwX37oWtagM5uN1eEFwxucMSosFu8jVKK/g8NCtuu4vXB6/WFbcfgBhfK7wCKTcnPywvuq/r3i4zxW6LH5wsdKOfcLwDkqtk2RLt8deTQ4WCA/fqGPXg5E+KDihEF+WbqmOSqwDk3fb9ZJDr02+Vtly9dDtC1uecePDXpmbDsPvrbTFBKA3SHDx4240CFAuc8L1J9VKSFc47cAweC9OOeGo+WKa1M2x2aOSzg9aXCQuz/4ksz7csTfGXKedNzYU2Pehivy1qF4uuB226TW7XCkhXLg5LsukjvB/ujV3rgrrXPP/u7qUq1r0w5Lyxb+W6hwfk1Ux5oRP1ePhT99wq2b90apO+Vno7lq94LqRCQmNQcr82bEzC3/qWgADmr1pgYgfm1ZSvfLRQqfPGYuUQ3oV4KCuvey8b+fV8H6QcOGoTNO7ah3+CBt7XRpUc3rN+0Efd2+P9uPUVRsHbVavg8XjP9yzGgYlnT4PyQmQvr0PFXQTpZis79xnNmzMTZM2eC9Pd26ICsNauxfssmjBr3BByuwNG1a3oPLH57KdZt3IC0Tp0C+u+tH3yAPX/dZTIHLGcmAoDO2D6R0kWhGul5S19CCEFyq+SoACy94cbE8b/Hm8uXYvCQhwOOSZKEPn37oE/fPnjl1VnweDxgjCEuLg4JCcEhrqoqNr+/CVlLV5huj87YvioP9CjeowbnReECBIAuXe6PWih73aV4YfLzWJ2VDbfbXe05FosFSUlJSE5OrhbepcJCLJw7D1lL3w5jBsKLPIr3aBXAy8VFjHO+JxQj3TJ6oWu3ruCcB/zd3/UBdM3oGfU+cdTwEfhk924UX79ep3To0qVL2JizAaOHjzQdtjfZ23O5uIhVhXC5S+rbqCBPqKuRc6fOIHNw9auhik+J+sBy5dJlzH1pJuQ4GY89PhIPDhqI1q1bIzExEVQUcf3aNdy44UZBfh4O5R7EP7/4KmIpl870bZX/VwEs9Xn3SS6poK77Y/yKAr8SfVC3E7VMxcfbd+Lj7Tvr5fMMzgtKfd59VdWYyn8uFxcxwzBy0CS1AzSMnMrwDQAIAIrqX885V5ow1dj3KYrqD1jRCgBokeQrBjc2NKGqKXyNDRZJvlIjQADwq+pbnHNfE64g7/P5VfWtW/VBAO0WayEzjHeakN067zfesVushbcFCAAev7LE4PxiE7aqkfeix68sqe5YtQAT7A6PzvSpTeiq8r6pCXaHp84AAUAWpd3MYFubQpdtLfV5d9d0vNbFBa9fmWpwfuEuDt0LXr9SayTWCtBlc5SoujYmllfuojjq+lVdG5N/5XKJaYAVueFxjemTAPC7iZ/G9EnnC/OP3+7EOq0PyqK0RdP1BXcLPU3XF5T6vFvqcm6dF1glUXxdZ2x54x9x2XJJFF+v6/khrVAXe9wzGjNEnbHlxR73jFDeExLAFvGJECmdoen6/EbWJ3JN1+eLlM5oEZ+IqAG8OZxVXXu6MYzOFaPt06GE7c1i+hmqsiht8WvqD7Io7WioT/YwOL+g6toYiyQfrzMwKqJzm/bl3kdIeM8PtEjycY/i7dUQZyzMYFs9irdXKPCA8pVHSZQgiRJIuAArk20q0PGqro1sCAUIg/OLqq6NpAId77I5SsK1F7E9urIo7Xb7vPfpjL0Ri/VEzrlPZ+wNt897nyxKuyNlN6KbnBPsDo9I6RxfmT+NGSwrFpYHOOcKM1iWr8yfJlI6p6aqSkwArBS7xVpIBTrd4/e11xmba3BecAdCtUBnbK7H72tPBTq9umJozAKsFKfVfkWkdPF1d0mHMk0dygzjfTM7IEKAVsQM4/0yTR163V3SQaR0cTSfYh5WGhOKVDzTfi+AvfXxYwRUkBEXL9eLp5Omn8Oo4cup4ecwbpa0tDT8D5D6BjprwqI9AAAAAElFTkSuQmCC"
            width={40}
            height={40}
            alt="10DowningStreet Twitter avatar"
            className="is-rounded"
          />
        </div>
        <div className="tweet-author">
          <span className="name">UK Prime Minister</span>&nbsp;<span className="handle">@10DowningStreet</span>
        </div>
      </div>
      <div className="tweet-body">{props.content}</div>
      <div className="tweet-footer">
        <div className="icons">
          <FontAwesomeIcon className="fas fa-reply" icon={faReply as IconProp} />
          &nbsp;
          <FontAwesomeIcon className="fas fa-retweet" icon={faRetweet as IconProp} />
          &nbsp;
          <FontAwesomeIcon className="fas fa-heart" icon={faHeart as IconProp} />
          &nbsp;
          <FontAwesomeIcon className="fas fa-arrow-up" icon={faArrowUp as IconProp} />
        </div>
      </div>
    </div>
  );
};
