from langchain_core.language_models import BaseChatModel
from langgraph.graph.state import CompiledStateGraph

from server.app.agents.graph import create_graph
from server.infra.llm.model import create_llm_model


class Injector:
    def new_llm_model(self) -> BaseChatModel:
        return create_llm_model()

    def new_graph(self) -> CompiledStateGraph:
        model = self.new_llm_model()
        return create_graph(model)


injector = Injector()
